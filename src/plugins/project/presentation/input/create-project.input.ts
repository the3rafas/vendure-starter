import { LanguageCode, Scalars } from "@vendure/core";
import { InputMaybe, LanguageInput } from "../../../utils/input/inputs";

export interface ProjectInput extends LanguageInput {
  name: string;
  description: string;
  slug: string;
  isPrivate: boolean;
  featuredAssetId?: InputMaybe<Scalars["ID"]>;
  translations: Array<CreateProjectTranslationInput>;
}

export type CreateProjectTranslationInput = {
  customFields?: InputMaybe<Scalars["JSON"]>;
  description: Scalars["String"];
  languageCode: LanguageCode;
  name: Scalars["String"];
  slug: Scalars["String"];
};
