import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { UtilsPlugin } from "../utils/utils.module";
import { ProductRepository } from "./infrastructure/product.repository";
import { ProductVariantRepository } from "./infrastructure/product-variant.repository";
import { ProductService } from "./product.service";
import { ProductResolvera } from "./presentation/product.resolver";
import gql from "graphql-tag";

const productSchema = gql`
  # extend type Mutation {
  #   createClient(input: CreateClientInput!): Client!
  #   deleteClient(input: FindClientInput!): Boolean!
  # }
  #
  input OprionsFilterProduct {
    groupId: ID
    optionId: ID
  }
  input filterSingleProduct {
    productId: ID!
    optionsIds: [OprionsFilterProduct]!
  }
  type singleProductFilter {
    productvariant: ProductVariant!
    options: [String]
  }
  extend type Query {
    singleProductsVariant(input: filterSingleProduct!): singleProductFilter!
  }
`;
@VendurePlugin({
  imports: [PluginCommonModule, UtilsPlugin],
  providers: [ProductRepository, ProductVariantRepository, ProductService],
  entities: [],
  shopApiExtensions: {
    schema: productSchema,
    resolvers: [ProductResolvera],
  },
  configuration: (config) => {
    // omitted
    return config;
  },
})
export class ProductPlugin {}
