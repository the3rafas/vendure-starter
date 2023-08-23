import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { config } from "src/vendure-config";
import { UtilsResolver } from "./utils.resolver";
import gql from "graphql-tag";
import { UtilsService } from "./utils.service";
import { CustomerRepository } from "./infrastructure/user.repository";
import { UtilsLoaderService } from "./utils.loader.service";

const schemaExtension = gql`
  input LanguageInput {
    languageCode: LanguageCode
  }
  extend type Product {
    isFav: Boolean
  }
  extend type CurrentUser {
    Product: [Product]
  }
`;
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [UtilsService, CustomerRepository, UtilsLoaderService],
  exports: [UtilsService,UtilsLoaderService],
  shopApiExtensions: {
    schema: schemaExtension,
    resolvers: [UtilsResolver],
  },
  configuration: (config) => {
    // omitted
    return config;
  },
})
export class UtilsPlugin {}
