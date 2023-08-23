import {
  Customer,
  CustomerService,
  ForbiddenError,
  ID,
  InternalServerError,
  LanguageCode,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { Injectable } from "@nestjs/common";
import { In, FindOptionsWhere, EntityTarget, ObjectLiteral } from "typeorm";
import { CustomerRepository } from "./infrastructure/user.repository";
const { DataLoader } = require("dataloader");
@Injectable()
export class UtilsLoaderService {
  constructor(
    private customerService: CustomerService,
    private customerRepo: CustomerRepository,
    private connection: TransactionalConnection
  ) {}

  async assets(ids: ID[]) {
    return new DataLoader(
      async (blogId: ID[]) => await this.findAssetByIds(blogId)
    );
  }

  private findAssetByIds(blogId: ID[]) {
    console.log(blogId);
    return null;
  }
}
