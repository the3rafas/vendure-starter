import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class FindClientInput {
  @Field(() => Int)
  clientId: number;
}
