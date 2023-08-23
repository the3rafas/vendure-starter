import * as DataLoader from "dataloader";
import { Asset, ID } from "@vendure/core";
export type BlogDataLoaderType = {
  AssetLoader: AssetLoaderType;
};
export type AssetLoaderType = DataLoader<ID, Asset[]>;
