import { InputType, Field } from "@nestjs/graphql";
@InputType()
export class FavInput {
  @Field(() => Number)
  productId: number;
}
