import gql from "graphql-tag";

export const BlogStoreSchema = gql`
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
  type BlogPaginatedList implements PaginatedList {
    items: [Blog!]!
    totalItems: Int!
  }
  input BlogFilterParameter {
    # id: IDOperators
    # createdAt: DateOperators
    # updatedAt: DateOperators
    languageCode: LanguageCode
    # name: StringOperators
    # slug: StringOperators
    # description: StringOperators
  }
  input BlogListOptions {
    filter: BlogFilterParameter
    limit: Int
    page: Int
  }
  input FindBlogInput {
    blogId: Int!
  }
  extend type Query {
    Blogs(input: BlogListOptions!): BlogPaginatedList!
    Blog(input: FindBlogInput!): Blog!
  }
`;
