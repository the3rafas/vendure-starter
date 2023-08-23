import { LanguageCode } from "@vendure/core";
import { InputType, Field } from "@nestjs/graphql";
import { PaginationInput } from "../../../utils/input/inputs";

@InputType()
export class FilterClient {
  @Field(() => LanguageCode, { nullable: true })
  languageCode?: LanguageCode;

  // @Field(() => String, { nullable: true })
  // searchkey?: string;
}
@InputType()
export class PaginateClient extends PaginationInput {
  @Field(() => LanguageCode, { nullable: true })
  filter: FilterClient;
}
