import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class FindBlogInput {
  @Field(() => Int)
  blogId: number;
}
