import gql from "graphql-tag";

export const BannerAdminSchema = gql`
  type Banner implements Node {
    id: ID!
    translations: [BannerTranslation!]!
    position: Int
    page: Int
    ratio: JSON
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

  input CreateBannerTranslationInput {
    languageCode: LanguageCode!
    asset: String!
  }
  input CreateBannerInput {
    position: Int
    page: Int
    ratio: String!
    translations: [CreateBannerTranslationInput!]!
  }
  input FindBannerInput {
    blogId: Int!
  }
  extend type Mutation {
    createBanner(input: CreateBannerInput!): Banner!
    deleteBanner(input: FindBannerInput!): Boolean!
  }
`;
