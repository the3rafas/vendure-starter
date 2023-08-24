import gql from "graphql-tag";

export const BannerStoreSchema = gql`
  type Banner implements Node {
    id: ID!
    translations: [BannerTranslation!]!
    position: Int
    page: Int
    ratio: JSON
    # row: Int
    # column: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type BannerTranslation {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    asset: String!
    languageCode: LanguageCode!
  }
  type BannerPaginatedList implements PaginatedList {
    items: [Banner!]!
    totalItems: Int!
  }
  input BannerFilterParameter {
    # id: IDOperators
    # createdAt: DateOperators
    # updatedAt: DateOperators
    languageCode: LanguageCode
    # name: StringOperators
    # slug: StringOperators
    # description: StringOperators
  }
  input BannerListOptions {
    filter: BannerFilterParameter
    limit: Int
    page: Int
  }
  input FindBannerInput {
    bannerId: Int!
  }
  extend type Query {
    banners(input: BannerListOptions): BannerPaginatedList!
    banner(input: FindBannerInput!): Banner!
  }
`;
