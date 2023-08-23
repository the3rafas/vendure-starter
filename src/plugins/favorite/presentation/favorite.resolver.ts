import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Allow, Ctx, Permission, RequestContext } from "@vendure/core";
import { FavoriteService } from "../favorte.service";
import { FavInput } from "./input/create-fav.input";
import { UtilsService } from "../../utils/utils.service";

@Resolver()
export class FavoriteResolver {
  constructor(private favService: FavoriteService) {}

  @Mutation((type) => Boolean)
  @Allow(Permission.Authenticated)
  async toggleFav(@Args("input") input: FavInput, @Ctx() ctx: RequestContext) {
    // const user: Customer = await this.utils.getCustomerForOwner(ctx);
    return await this.favService.ToogleFavProduct(
      input.productId,
      ctx.activeUserId as number
    );
  }
}
