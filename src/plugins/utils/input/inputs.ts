import { InputType, Field } from "@nestjs/graphql";
import { LanguageCode } from "@vendure/core";

@InputType()
export class LanguageInput {
  @Field(() => LanguageCode, { nullable: true, defaultValue: LanguageCode.en })
  languageCode: LanguageCode;
}

@InputType()
export class PaginationInput {
  limit: number = 15;
  page: number = 0;
}

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
