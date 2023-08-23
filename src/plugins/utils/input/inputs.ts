import { InputType, Field } from "@nestjs/graphql";
import { LanguageCode } from "@vendure/core";

@InputType()
export class LanguageInput {
  @Field(() => LanguageCode, { nullable: true, defaultValue: LanguageCode.en })
  languageCode: LanguageCode;
}

@InputType()
export class PaginationInput {
  @Field(() => Number, { nullable: true })
  limit: number;
  @Field(() => Number, { nullable: true })
  page: number;
}

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
