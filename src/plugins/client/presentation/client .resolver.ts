import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { Client } from "../infrastructure/model/client.model";
import { ClientService } from "../client.service";
import { ClientInput, CreateClientInput } from "./input/create-client.input";
import { FindClientInput } from "./input/find-client.input";
import {
  Ctx,
  FilterParameter,
  NullOptionals,
  PaginatedList,
  RelationPaths,
  Relations,
  RequestContext,
} from "@vendure/core";
import { FilterClient, PaginateClient } from "./input/filter-client.input";

@Resolver()
export class ClientResolver {
  constructor(private clientService: ClientService) {}

  @Mutation((type) => Client)
  createClient(
    @Args("input") input: CreateClientInput,
    @Ctx() ctx: RequestContext
  ): Promise<Client> {
    return this.clientService.createClient(input, ctx);
  }
  @Mutation((type) => Boolean)
  deleteClient(@Args("input") input: FindClientInput): Promise<Boolean> {
    return this.clientService.deleteClient(input.clientId);
  }
  //: Promise<PaginatedList<Client>>
  @Query((type) => [Client])
  Clients(
    @Args("input") input: PaginateClient,
    @Ctx() ctx: RequestContext,
  ) {
    return this.clientService.clients(input, ctx);
  }
}
