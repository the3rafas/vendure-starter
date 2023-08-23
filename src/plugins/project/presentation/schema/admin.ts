import gql from "graphql-tag";
export const ProjectAdminschema = gql`
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
  input CreateProjectTranslationInput {
    name: String!
    description: String!
    languageCode: LanguageCode!
    slug: String!
  }
  input ProjectInput {
    name: String!
    description: String!
    languageCode: LanguageCode!
    slug: String!
    isPrivate: Boolean
    featuredAssetId: ID
    translations: [CreateProjectTranslationInput!]!
  }
  input FindProjectInput {
    ProjectId: Int!
  }

  input CreateProjectInput {
    data: [ProjectInput]!
  }

  extend type Mutation {
    createProject(input: ProjectInput!): Project!
    deleteProject(input: FindProjectInput!): Boolean!
  }
`;
