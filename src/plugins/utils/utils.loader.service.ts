import {
  Asset,
  CustomerService,
  ID,
  TransactionalConnection,
} from "@vendure/core";
import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./infrastructure/user.repository";
const DataLoader = require("dataloader");
@Injectable()
export class UtilsLoaderService {
  constructor(
    private customerService: CustomerService,
    private customerRepo: CustomerRepository,
    private connection: TransactionalConnection
  ) {}

  getLoader() {
    return {
      assets: new DataLoader(
        async (keys: ID[]) => await this.getAssetsByBlogId(keys)
      ),
    };
  }
  private async getAssetsByBlogId(blogId: ID[]) {
    console.log(blogId);
    return [null];
  }
}
