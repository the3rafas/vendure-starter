import { ID } from "@vendure/common/lib/shared-types";
import {
  ActiveOrderStrategy,
  Customer,
  CustomerService,
  idsAreEqual,
  Injector,
  Order,
  OrderService,
  RequestContext,
  TransactionalConnection,
  User,
  UserService,
} from "@vendure/core";
import gql from "graphql-tag";

// This strategy assumes a "orderToken" custom field is defined on the Order
// entity, and uses that token to perform a lookup to determine the active Order.
//
// Additionally, it does _not_ define a `createActiveOrder()` method, which
// means that a custom mutation would be required to create the initial Order in
// the first place and set the "orderToken" custom field.
export class TokenActiveOrderStrategy
  implements ActiveOrderStrategy<{ id: ID }>
{
  readonly name = "orderToken";

  private connection: TransactionalConnection;
  private orderService: OrderService;
  private customerService: CustomerService;

  init(injector: Injector) {
    this.connection = injector.get(TransactionalConnection);
    this.orderService = injector.get(OrderService);
    this.customerService = injector.get(CustomerService);
  }

  defineInputType = () => gql`
    input OrderTokenActiveOrderInput {
      id: ID
    }
  `;

  async determineActiveOrder(
    ctx: RequestContext,
    input: { id: ID } = { id: "" }
  ) {
    console.log(ctx.activeUserId, input.id);
    // [1]
    if (!input.id && !ctx.activeUserId) {
      console.log(1);
      return await this.orderService.create(ctx);
    }
    // [2]
    if (input?.id && ctx.activeUserId) {
      console.log(2);
      const customer = (await this.customerService.findOneByUserId(
        ctx,
        ctx.activeUserId
      )) as Customer;
      const order = (await as(this.connection, ctx, input.id)) as Order;
      const customerOrder = await this.orderService.getActiveOrderForUser(
        ctx,
        ctx.activeUserId
      );
      // [2.1]
      if (!order.customerId && customerOrder) {
        return await this.orderService.mergeOrders(
          ctx,
          customer.user as User,
          order,
          customerOrder
        );
      }
      const orderUserId =
        order.customer && order.customer.user && order.customer.user.id;
      console.log(orderUserId, ctx.activeUserId);

      // [2.2]
      //TODO: مش منطقي بالمرة و مستحيل حدوثه يا غبي  فكرني أشيله
      if (
        order?.customerId &&
        !customerOrder &&
        idsAreEqual(orderUserId, ctx.activeUserId)
      ) {
        return await this.orderService.addCustomerToOrder(
          ctx,
          order.id,
          customer
        );
      }
      // [2.3]
      if (
        order?.customerId &&
        customerOrder &&
        idsAreEqual(orderUserId, ctx.activeUserId)
      )
        return order;
      return;
      // return await this.orderService.addCustomerToOrder(
      //   ctx,
      //   order.id,
      //   customer
      // );
      // const orderUserId =
      //   order.customer && order.customer.user && order.customer.user.id;
    }
    // [3]
    if (input.id && !ctx.activeUserId) {
      console.log(3);
      return await as(this.connection, ctx, input.id);
    }
    // [4]
    if (!input.id && ctx.activeUserId) {
      console.log(4);
      const activeorder = await this.orderService.getActiveOrderForUser(
        ctx,
        ctx.activeUserId
      );
      if (activeorder) return activeorder;
      const createdOrder = await this.orderService.create(ctx);
      const customer = (await this.customerService.findOneByUserId(
        ctx,
        ctx.activeUserId
      )) as Customer;
      return await this.orderService.addCustomerToOrder(
        ctx,
        createdOrder.id,
        customer
      );
    }

    // const qb = this.connection
    //   .getRepository(ctx, Order)
    //   .createQueryBuilder("order")
    //   .leftJoinAndSelect("order.customer", "customer")
    //   .leftJoinAndSelect("customer.user", "user")
    //   .where("order.id = :orderId ", {
    //     orderId: +input.id,
    //   });

    // const order = await qb.getOne();
    //   console.log(">>>>>>>>>>>>>>>>>>>>");
    //   console.log(order);
    //   console.log(">>>>>>>>>>>>>>>>>>>>");

    // if (!order) {
    //   return;
    // }

    // const orderUserId =
    //   order.customer && order.customer.user && order.customer.user.id;
    // //   if (order.customer && idsAreEqual(orderUserId, ctx.activeUserId)) {
    // return order;
    //   }
    // Ensure the active user is the owner of this Order
  }
}

// in vendure-config.ts
export const config = {
  // ...
  orderOptions: {
    activeOrderStrategy: new TokenActiveOrderStrategy(),
  },
};
async function as(
  connection: TransactionalConnection,
  ctx: RequestContext,
  id: ID
) {
  const qb = connection
    .getRepository(ctx, Order)
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.customer", "customer")
    .leftJoinAndSelect("customer.user", "user")
    .where("order.id = :orderId ", {
      orderId: +id,
    });

  const order = (await qb.getOne()) as Order;
  if (!order) {
    return;
  }
  return order;
}
