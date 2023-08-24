import { LanguageCode } from "@vendure/core";
import { InputType, Field } from "@nestjs/graphql";
import { PaginationInput } from "../../../utils/input/inputs";
import { FindOptionsWhere } from "typeorm";
import { Banner } from "../../infrastructure/model/banner.model";

export class FilterBanner {
  languageCode?: LanguageCode = LanguageCode.en;

  // @Field(() => String, { nullable: true })
  // searchkey?: string;
}

export class PaginateBanner extends PaginationInput {
  filter: FindOptionsWhere<Banner> = {};
  // FindOptionsWhere<Blog>
}
