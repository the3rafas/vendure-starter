import { LanguageCode } from "@vendure/core";
import { PaginationInput } from "../../../utils/input/inputs";
import { FindOptionsWhere } from "typeorm";
import { Project } from "../../infrastructure/model/project.model";

export interface FilterProject {
  languageCode?: LanguageCode;

  // @Field(() => String, { nullable: true })
  // searchkey?: string;
}

export interface PaginateProject extends PaginationInput {
  filter: FindOptionsWhere<Project>;
  // FindOptionsWhere<Blog>
}
