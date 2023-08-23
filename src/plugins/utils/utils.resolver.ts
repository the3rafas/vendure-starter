import {
  Args,
  Mutation,
  Query,
  Parent,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import {
  Ctx,
  Customer,
  Product,
  RequestContext,
  Transaction,
} from "@vendure/core";
import { UtilsService } from "./utils.service";
import { Loader } from "../_common/decorators/dataloader";
import { IDataLoaders } from "../_common/dataloader/dataloader.interface";

@Resolver(Product)
export class UtilsResolver {
  constructor(private utils: UtilsService) {}

  @ResolveField((type) => Boolean)
  async isFav(
    @Parent() parent: Product,
    @Ctx() ctx: RequestContext,
    @Loader() loader: IDataLoaders
  ) {
    loader
    if (!ctx?.activeUserId) {
      return false;
    }
    const user: Customer = await this.utils.getCustomerForOwner(ctx);

    return user.customFields.FavoriteProducts.find(
      (product) => product.id === parent.id
    )
      ? true
      : false;
  }
}
