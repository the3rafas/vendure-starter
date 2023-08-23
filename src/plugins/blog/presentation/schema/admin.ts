import gql from "graphql-tag";
export const BlogAdminschema = gql`
  type Blog implements Node {
    id: ID!
    translations: [BlogTranslation!]!
    featuredAsset: Asset
    assets: [Asset!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type BlogTranslation {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    languageCode: LanguageCode!
    name: String!
    description: String!
    slug: String!
  }
  input CreateBlogTranslationInput {
    name: String!
    description: String!
    languageCode: LanguageCode!
    slug: String!
  }
  input CreateBlogInput {
    name: String!
    description: String!
    languageCode: LanguageCode!
    slug: String!
    isPrivate: Boolean
    featuredAssetId: ID
    assetIds: [ID!]
    translations: [CreateBlogTranslationInput!]!
  }

  input FindBlogInput {
    blogId: Int!
  }

  extend type Mutation {
    createBlog(input: CreateBlogInput!): Blog!
    deleteBlog(input: FindBlogInput!): Boolean!
  }
`;
