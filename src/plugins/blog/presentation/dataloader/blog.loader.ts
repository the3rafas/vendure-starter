const { DataLoader } = require("dataloader");

import { Inject, Injectable } from "@nestjs/common";
import { IDataLoaderService } from "../../../_common/dataloader/dataloader.interface";
import {
  AssetLoaderType,
  BlogDataLoaderType,
} from "src/plugins/_common/dataloader/dataloader.type";
@Injectable()
export class BlogLoader implements IDataLoaderService {
  public createLoaders(): BlogDataLoaderType {
    const AssetLoader: AssetLoaderType = new DataLoader(
      async (blogId: string[]) => await this.findUserByIds(blogId)
    );

    return {
      AssetLoader,
    };
  }

  private async findUserByIds(blogId: string[]) {
    console.log(blogId);
    return null;
  }
}
