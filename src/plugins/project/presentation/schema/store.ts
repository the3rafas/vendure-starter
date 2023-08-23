import gql from "graphql-tag";

export const ProjectStoreschema = gql`
  type Project implements Node {
    id: ID!
    translations: [ProjectTranslation!]!
    featuredAsset: Asset
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type ProjectTranslation {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    languageCode: LanguageCode!
    name: String!
    description: String!
    slug: String!
  }
  type ProjectPaginatedList implements PaginatedList {
    items: [Project!]!
    totalItems: Int!
  }
  input ProjectFilterParameter {
    # id: IDOperators
    # createdAt: DateOperators
    # updatedAt: DateOperators
    languageCode: LanguageCode
    # name: StringOperators
    # slug: StringOperators
    # description: StringOperators
  }
  input ProjectListOptions {
    filter: ProjectFilterParameter
    limit: Int
    page: Int
  }
  input FindProjectInput {
    projectId: Int!
  }

  extend type Query {
    Projects(input: ProjectListOptions): ProjectPaginatedList!
    Project(input: FindProjectInput!): Project!
  }
`;
