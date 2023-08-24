import { InputMaybe } from "@vendure/common/lib/generated-types";
import { LanguageCode, Scalars } from "@vendure/core";
import { LanguageInput } from "../../../utils/input/inputs";

export class BannerInput extends LanguageInput {
  page: number;
  position: number;
  ratio: string;
  translations: Array<CreateBannerTranslationInput>;
}

// export interface CreateBlogInput {
//   data: BlogInput[];
// }

export type CreateBannerTranslationInput = {
  customFields?: InputMaybe<Scalars["JSON"]>;
  languageCode: LanguageCode;
  asset?: InputMaybe<Scalars["String"]>;
};
