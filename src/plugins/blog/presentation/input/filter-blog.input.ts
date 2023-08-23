import { LanguageCode } from "@vendure/core";
import { InputType, Field } from "@nestjs/graphql";
import { PaginationInput } from "../../../utils/input/inputs";
import { Blog } from "../../infrastructure/model/blog.model";
import { FindOptionsWhere } from "typeorm";

@InputType()
export class FilterBlog {
  @Field(() => LanguageCode, { nullable: true })
  languageCode?: LanguageCode;

  // @Field(() => String, { nullable: true })
  // searchkey?: string;
}

export class PaginateBlog extends PaginationInput {
  filter: FindOptionsWhere<Blog>;
  // FindOptionsWhere<Blog>
}
