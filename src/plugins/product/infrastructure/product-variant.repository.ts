import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import {
  ID,
  LanguageCode,
  Product,
  ProductVariant,
  TransactionalConnection,
} from "@vendure/core";
import { In } from "typeorm";

@Injectable()
export class ProductVariantRepository {
  variantRepo: Repository<ProductVariant>;
  constructor(private connection: TransactionalConnection) {
    this.variantRepo =
      this.connection.rawConnection.getRepository(ProductVariant);
  }

  async findOne(id: ID, relations: any[] = []) {
    return await this.variantRepo.findOne({ where: { id }, relations });
  }
  async findVariantSingleProduct(productId: ID, options: ID[] = []) {
    return (await this.variantRepo.find({
      where: {
        productId,

        ...(options.length && {
          options: {
            id: In(options),
          },
        }),
      },
      relations: ["options"],
      select: ["id"],
    })) as ProductVariant[];
  }

  async delete(id: ID) {
    return !!(await this.variantRepo.delete(id));
  }
}
