import { Injectable } from "@nestjs/common";
import { ClientRepository } from "./infrastructure/client.repository";
import {
  ClientInput,
  CreateClientInput,
} from "./presentation/input/create-client.input";
import { Client } from "./infrastructure/model/client.model";
import {
  ChannelService,
  InternalServerError,
  LanguageCode,
  ListQueryBuilder,
  PaginatedList,
  RequestContext,
  TranslatableSaver,
  Translated,
  TranslatorService,
} from "@vendure/core";
import { ClientTranslation } from "./infrastructure/model/client-translation";
import { PaginateClient } from "./presentation/input/filter-client.input";
import { SlugValidator } from "@vendure/core/dist/service/helpers/slug-validator/slug-validator";
import { UtilsService } from "../utils/utils.service";
@Injectable()
export class ClientService {
  private readonly relations = ["translations", "channels"];
  constructor(
    private clientRepo: ClientRepository,
    private translateSaver: TranslatableSaver,
    private channelService: ChannelService,
    private listQueryBuilder: ListQueryBuilder,
    private translator: TranslatorService,
    private utils: UtilsService,
    private slugValidator: SlugValidator
  ) {}

  async createClient(
    input: CreateClientInput,
    ctx: RequestContext
  ): Promise<Client> {
    await this.utils.validateSlug(
      Client,
      input.data.map((e) => e.slug)
    );
    const client = await this.translateSaver.create({
      ctx,
      entityType: Client,
      input: {
        translations: input.data,
      },
      translationType: ClientTranslation,
      beforeSave: async (p) => {
        await this.channelService.assignToCurrentChannel(p, ctx);
      },
    });

    return client;
  }
  // : Promise<Client[]>
  async clients(
    data: PaginateClient,
    ctx: RequestContext
  ): Promise<PaginatedList<Translated<Client>>> {
    return (await this.listQueryBuilder
      .build(
        Client,
        {
          filter: {

          },
          take: data?.limit ?? 10,
          ...(data?.page && { skip: data?.limit ?? 10 * data?.page ?? 0 }),
        },
        {
          relations: this.relations,
          channelId: ctx.channelId,
          where: {
            translations: {
              ...(data?.filter?.languageCode && {
                languageCode: LanguageCode.ar || data.filter.languageCode,
              }),
            },
          },
          ctx,
        }
      )
      .getManyAndCount()
      .then(async ([items, totalItems]) => {
        // const items = clients.map((client) =>
        // this.translator.translate(client, ctx, [
        //   // "",
        //   // ["channels", ""],
        // ])
        // );
        return {
          items,
          totalItems,
        };
      })) as PaginatedList<Translated<Client>>;
  }
  async deleteClient(clientId: number): Promise<Boolean> {
    const client = await this.clientRepo.findOne(clientId);
    if (!client) throw new InternalServerError("Client Does Not Exist");
    return await this.clientRepo.delete(clientId);
  }
}
