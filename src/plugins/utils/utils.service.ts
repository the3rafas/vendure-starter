import {
  Customer,
  CustomerService,
  ForbiddenError,
  InternalServerError,
  LanguageCode,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { Injectable } from "@nestjs/common";
import {
  In,
  FindOptionsWhere,
  FindOptionsOrder,
  EntityTarget,
  ObjectLiteral,
} from "typeorm";
import { CustomerRepository } from "./infrastructure/user.repository";

@Injectable()
export class UtilsService {
  constructor(
    private customerService: CustomerService,
    private customerRepo: CustomerRepository,
    private connection: TransactionalConnection
  ) {}

  public async getCustomerForOwner(ctx: RequestContext): Promise<Customer> {
    const userId = ctx.activeUserId;
    if (!userId) {
      throw new ForbiddenError();
    }
    const customer = await this.customerRepo.retriveOneWithRelation(
      userId as number
    );
    if (!customer) {
      throw new InternalServerError("error.no-customer-found-for-current-user");
    }
    return customer;
  }
  // https://github.com/typeorm/typeorm/issues/7122
  public async validateSlug(entity: any, slug: string[]) {
    if (this.uniqueArray(slug).length !== slug.length)
      throw new InternalServerError("slug already exists");
    const slugs = await this.connection.rawConnection
      .getRepository(entity)
      .findOne({
        where: {
          translations: {
            slug: In(slug),
          },
        },
        relations: ["translations"],
      });
    console.log(slugs);

    if (slugs) {
      throw new InternalServerError("slug already exists");
    }
  }

  public uniqueArray(arr: any[]) {
    return [...new Set(arr.map((o: any) => JSON.stringify(o)))].map((s: any) =>
      JSON.parse(s)
    );
  }
  public async listEntityPagination<Entity>(
    entity: EntityTarget<ObjectLiteral>,
    relations: string[] = [],
    where: FindOptionsWhere<Entity> = {},
    page: number = 0,
    limit: number = 15,
    sort: FindOptionsOrder<Entity> = {}
  ) {
    let take = limit;
    if (page <= 1) page = 0;
    if (limit <= 0) page = 15;
    let skip = page * limit;
    return (await this.connection.rawConnection
      .getRepository(entity)
      .find({
        skip,
        take,
        order: {
          ...(sort ? sort : { createdAt: "DESC" }),
        },
        where: {
          translations: {
            ...where,
            //   languageCode: where.languageCode ?? LanguageCode.ar,
          },
        },
        relations: ["translations", ...relations],
      })
      .then(async (items) => {
        const totalItems = await this.connection.rawConnection
          .getRepository(entity)
          .count();
        return {
          items,
          totalItems,
        };
      })) as any;
  }
}
