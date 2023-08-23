import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { FavoriteService } from "./favorte.service";
import { FavoriteResolver } from "./presentation/favorite.resolver";
import gql from "graphql-tag";
import { FavoriteRepository } from "./infrastructure/favorite.repository";
import { UtilsPlugin } from "../utils/utils.module";

const schemaExtension = gql`
  input FavInput {
    productId: String!
  }
  extend type Mutation {
    toggleFav(input: FavInput): Boolean
  }
`;
@VendurePlugin({
  imports: [PluginCommonModule, UtilsPlugin],
  providers: [FavoriteService, FavoriteRepository],
  shopApiExtensions: {
    schema: schemaExtension,
    resolvers: [FavoriteResolver],
  },
  configuration: (config) => {
    // omitted
    return config;
  },
})
export class FavoritePlugin {}
