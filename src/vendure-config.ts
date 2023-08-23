import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
  Product,
} from "@vendure/core";
import { defaultEmailHandlers, EmailPlugin } from "@vendure/email-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import "dotenv/config";
import path from "path";
import {
  Create_Blog,
  Delete_Blog,
  update_Blog,
} from "./plugins/blog/presentation/blog.permission";
import { UtilsPlugin } from "./plugins/utils/utils.module";
import { FavoritePlugin } from "./plugins/favorite/favorite.module";
import { ClintePlugin } from "./plugins/client/client.module";
import { BlogPlugin } from "./plugins/blog/blog.module";
import { ProductPlugin } from "./plugins/product/product.module";
import { TokenActiveOrderStrategy } from "./plugins/_common/vendure/order.strategy";
import { ProjectPlugin } from "./plugins/project/project.module";

const IS_DEV = process.env.APP_ENV === "dev";

export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    shopApiPath: "store-api",
    // The following options are useful in development mode,
    // but are best turned off for production for security
    // reasons.
    ...(IS_DEV
      ? {
          adminApiPlayground: {
            settings: { "request.credentials": "include" } as any,
          },
          adminApiDebug: true,
          shopApiPlayground: {
            settings: { "request.credentials": "include" } as any,
          },
          shopApiDebug: true,
        }
      : {}),
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME,
      password: process.env.SUPERADMIN_PASSWORD,
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET,
    },
    customPermissions: [Create_Blog, update_Blog, Delete_Blog],
  },
  dbConnectionOptions: {
    type: "postgres",
    // See the README.md "Migrations" section for an explanation of
    // the `synchronize` and `migrations` options.
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*.+(js|ts)")],
    logging: false,

    // entities:[Favorites,'./plugins/*/*.model.ts'],

    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  orderOptions: {
    activeOrderStrategy: new TokenActiveOrderStrategy(),
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  // When adding or altering custom field definitions, the database will
  // need to be updated. See the "Migrations" section in README.md.
  customFields: {
    Product: [
      {
        name: "isSelected",
        type: "boolean",
        defaultValue: false,
        ui: { component: "ckeckbox-form-input" },
      },
    ],
    Customer: [
      {
        name: "FavoriteProducts",
        type: "relation",
        list: true,
        entity: Product,
        eager: true,
      },
    ],
  },
  plugins: [
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../static/assets"),
      // For local dev, the correct value for assetUrlPrefix should
      // be guessed correctly, but for production it will usually need
      // to be set manually to match your production url.
      assetUrlPrefix: IS_DEV ? undefined : "https://www.my-shop.com/assets",
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, "../static/email/test-emails"),
      route: "mailbox",
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, "../static/email/templates"),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation.
        // Here we are assuming a storefront running at http://localhost:8080.
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: "http://localhost:8080/verify",
        passwordResetUrl: "http://localhost:8080/password-reset",
        changeEmailAddressUrl:
          "http://localhost:8080/verify-email-address-change",
      },
    }),
    AdminUiPlugin.init({
      route: "admin",
      port: 3002,
    }),
    UtilsPlugin,
    FavoritePlugin,
    ClintePlugin,
    BlogPlugin,
    ProductPlugin,
    ProjectPlugin,
  ],
};
