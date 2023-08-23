import { Injectable } from "@nestjs/common";
import { Client } from "./model/client.model";
import { Repository } from "typeorm";
import { LanguageCode, TransactionalConnection } from "@vendure/core";
import { ClientInput } from "../presentation/input/create-client.input";
import { FilterClient } from "../presentation/input/filter-client.input";
@Injectable()
export class ClientRepository {
  clientRepo: Repository<Client>;
  constructor(private connection: TransactionalConnection) {
    this.clientRepo = this.connection.rawConnection.getRepository(Client);
  }

  async createOne(data: ClientInput) {
    const client = this.clientRepo.create({
      name: data.name,
      url: data.url,
    });

    return await this.clientRepo.save(client);
  }
  async findAll(filter: FilterClient = {}) {
    console.log(filter);

    return await this.clientRepo.find({
      where: {
        translations: {
          ...(filter.languageCode && {
            languageCode: filter.languageCode,
          }),
        },
      },
    });
  }
  async findOne(id: number) {
    return await this.clientRepo.findOne({ where: { id } });
  }

  async delete(id: number) {
    return !!(await this.clientRepo.delete(id));
  }
}
