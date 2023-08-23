import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import gql from "graphql-tag";
import { UtilsPlugin } from "../utils/utils.module";
import { Blog } from "./infrastructure/model/blog.model";
import { BlogService } from "./blog.service";
import { BlogStoreResolver } from "./presentation/blog-store.resolver";
import { BlogRepository } from "./infrastructure/blog.repository";
import { BlogTranslation } from "./infrastructure/model/blog.translation";
import { BlogAsset } from "./infrastructure/model/blogAssit";
import { BlogAdminResolver } from "./presentation/blog-admin.resolver";
import { generateListOptions } from "@vendure/core/dist/api/config/generate-list-options";
import { buildSchema } from "graphql";
import { BlogStoreSchema } from "./presentation/schema/store";
import { BlogAdminschema } from "./presentation/schema/admin";
// const schema = buildSchema("./presentation/input/create-blog.input.ts");
// const schemaAdminExtensiona = generateListOptions(schema);
// console.log(schema);


@VendurePlugin({
  imports: [PluginCommonModule, UtilsPlugin],
  providers: [BlogService, BlogRepository],
  entities: [Blog, BlogTranslation, BlogAsset],
  shopApiExtensions: {
    schema: BlogStoreSchema,
    resolvers: [BlogStoreResolver],
  },
  adminApiExtensions: {
    schema: BlogAdminschema,
    resolvers: [BlogAdminResolver],
  },
  configuration: (config) => {
    // omitted
    return config;
  },
})
export class BlogPlugin {}
