import {
  InjectableStrategy,
  Order,
  Product,
  RequestContext,
} from "@vendure/core";

declare module "@vendure/core/dist/entity/custom-entity-fields" {
  interface FavoriteProducts {
    customerId: number;
    productId: number;
  }
  interface CustomCustomerFields {
    FavoriteProducts: Product[];
  }
}

interface ActiveOrderStrategy<
  InputType extends Record<string, any> | void = void
> extends InjectableStrategy {
  readonly name: string;
  defineInputType?: () => Document;
  createActiveOrder?: (ctx: RequestContext, input: InputType) => Promise<Order>;
  determineActiveOrder(
    ctx: RequestContext,
    input: InputType
  ): Promise<Order | undefined>;
}
