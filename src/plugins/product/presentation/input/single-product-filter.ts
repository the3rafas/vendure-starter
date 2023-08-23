import { ID } from "@vendure/core";

interface OptionssingleFilter {
  groupId: ID;
  optionId: ID;
}
export interface filterSingleProduct {
  productId: ID;
  optionsIds: OptionssingleFilter[];
}
