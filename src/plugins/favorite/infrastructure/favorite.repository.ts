import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateOrFindFavInput } from "./dtos/create-fav.dto";
import {
  Customer,
  InternalServerError,
  Product,
  TransactionalConnection,
} from "@vendure/core";

@Injectable()
export class FavoriteRepository {
  customerRepo: Repository<Customer>;
  productRepo: Repository<Product>;
  constructor(private connection: TransactionalConnection) {
    this.customerRepo = this.connection.rawConnection.getRepository(Customer);
    this.productRepo = this.connection.rawConnection.getRepository(Product);
  }
  async findOrCreate(input: CreateOrFindFavInput): Promise<boolean | any> {
    try {
      let product = (await this.productRepo.findOne({
        where: { id: input.productId },
      })) as Product;
      if (!product) throw new InternalServerError("product Does not exist");

      let customer = (await this.customerRepo.findOne({
        where: { user: { id: input.customerId } },
        relations: {
          customFields: {
            FavoriteProducts: true,
          },
        },
      })) as Customer;

      const arr = customer.customFields.FavoriteProducts;

      if (arr.find((e: Product) => e.id === product.id)) {
        customer.customFields.FavoriteProducts = arr.filter(
          (e: Product) => e.id !== product.id
        ) as Product[];
      } else {
        customer.customFields.FavoriteProducts.push(product);
      }
      this.customerRepo.save(customer);
      return true;
    } catch (error) {}
  }

  async findAll(customerId: number) {
    // return await this.cu.find({ where: { customerId }, relations: {} });
  }
}
