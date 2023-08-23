import { Ctx, RequestContext } from "@vendure/core";
import { ProductService } from "../product.service";

import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { filterSingleProduct } from "./input/single-product-filter";
@Resolver()
export class ProductResolvera {
  constructor(private productService: ProductService) {}

  @Query()
  async singleProductsVariant(
    @Args("input") input: filterSingleProduct,
    @Ctx() ctx: RequestContext
  ) {
    return await this.productService.filterSingleProduct(
      ctx,
      input.productId,
      input.optionsIds
    );
  }
}
