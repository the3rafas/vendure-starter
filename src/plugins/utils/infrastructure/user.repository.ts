import { Injectable } from "@nestjs/common";

import { Repository } from "typeorm";
import { Customer, LanguageCode, TransactionalConnection } from "@vendure/core";
@Injectable()
export class CustomerRepository {
  customerRepo: Repository<Customer>;
  constructor(private connection: TransactionalConnection) {
    this.customerRepo = this.connection.rawConnection.getRepository(Customer);
  }

  async retriveOneWithRelation(userId: number) {
    return await this.customerRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
        customFields: {
          FavoriteProducts: true,
        },
      },
    });
  }
}
