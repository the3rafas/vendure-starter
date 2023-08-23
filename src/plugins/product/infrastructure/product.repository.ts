import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { LanguageCode, Product, TransactionalConnection } from "@vendure/core";

@Injectable()
export class ProductRepository {
  productRepo: Repository<Product>;
  constructor(private connection: TransactionalConnection) {
    this.productRepo = this.connection.rawConnection.getRepository(Product);
  }

  async findOne(id: number) {
    return await this.productRepo.findOne({ where: { id } });
  }

  async delete(id: number) {
    return !!(await this.productRepo.delete(id));
  }
}
