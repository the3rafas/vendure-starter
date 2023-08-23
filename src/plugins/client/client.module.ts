import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import gql from "graphql-tag";
import { UtilsPlugin } from "../utils/utils.module";
import { Client } from "./infrastructure/model/client.model";
import { ClientService } from "./client.service";
import { ClientResolver } from "./presentation/client .resolver";
import { ClientRepository } from "./infrastructure/client.repository";
import { ClientTranslation } from "./infrastructure/model/client-translation";

const schemaExtension = gql`
  input ClientInput {
    name: String!
    url: String!
    languageCode: LanguageCode
    slug: String!
  }

  input CreateClientInput {
    data: [ClientInput]!
  }
  input FindClientInput {
    clientId: Int!
  }
  input FilterClient {
    languageCode: LanguageCode
    # searchkey: String
  }
  input ClientListOptions {
    filter: FilterClient
    limit: Int
    page: Int
  }

  type ClientPaginatedList {
    items: [Client]
    totalItems: Int
  }
  type Client implements Node {
    id: ID!
    translations: [ClientTranslation!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type ClientTranslation {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    languageCode: LanguageCode!
    name: String!
    url: String!
    slug: String!
  }
  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
    deleteClient(input: FindClientInput!): Boolean!
  }
  #
  extend type Query {
    Clients(input: ClientListOptions): ClientPaginatedList!
  }
`;
@VendurePlugin({
  imports: [PluginCommonModule, UtilsPlugin],
  providers: [ClientService, ClientRepository],
  entities: [Client, ClientTranslation],
  shopApiExtensions: {
    schema: schemaExtension,
    resolvers: [ClientResolver],
  },
  configuration: (config) => {
    // omitted
    return config;
  },
})
export class ClintePlugin {}
