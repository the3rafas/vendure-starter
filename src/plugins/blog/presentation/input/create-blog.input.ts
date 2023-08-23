import { InputType, Field } from "@nestjs/graphql";
import { InputMaybe, LanguageInput } from "../../../utils/input/inputs";
import { LanguageCode, Scalars } from "@vendure/core";

export interface BlogInput extends LanguageInput {
  name: string;
  description: string;
  slug: string;
  isPrivate: boolean;
  featuredAssetId?: InputMaybe<Scalars["ID"]>;
  assetIds?: InputMaybe<Array<Scalars["ID"]>>;
  translations: Array<CreateBlogTranslationInput>;
}

// export interface CreateBlogInput {
//   data: BlogInput[];
// }

export type CreateBlogTranslationInput = {
  customFields?: InputMaybe<Scalars["JSON"]>;
  description: Scalars["String"];
  languageCode: LanguageCode;
  name: Scalars["String"];
  slug: Scalars["String"];
};
