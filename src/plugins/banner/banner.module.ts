import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { Banner } from "./infrastructure/model/banner.model";
import { BannerTranslation } from "./infrastructure/model/banner.translation";
import { BannerRepository } from "./infrastructure/banner,repositiory";
import { BannerService } from "./banner.service";
import { UtilsPlugin } from "../utils/utils.module";
import { BannerAdminResolver } from "./presentation/banner-admin.resolver";
import { BannerStoreResolver } from "./presentation/banner-store.resolver";
import { BannerAdminSchema } from "./presentation/schema/admin";
import { BannerStoreSchema } from "./presentation/schema/store";

@VendurePlugin({
  imports: [PluginCommonModule, UtilsPlugin],
  providers: [BannerService, BannerRepository],
  entities: [Banner, BannerTranslation],
  adminApiExtensions: {
    resolvers: [BannerAdminResolver],
    schema: BannerAdminSchema,
  },
  shopApiExtensions: {
    resolvers: [BannerStoreResolver],
    schema: BannerStoreSchema,
  },
})
export class BannerPlugin {}
