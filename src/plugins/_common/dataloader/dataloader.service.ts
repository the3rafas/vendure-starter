import { Injectable, Inject } from "@nestjs/common";
import { IDataLoaderService, IDataLoaders } from "./dataloader.interface";
import { BlogLoader } from "../../blog/presentation/dataloader/blog.loader";
@Injectable()
export class DataloaderService implements IDataLoaderService {
  constructor(
    @Inject(BlogLoader) private readonly assetLoader: IDataLoaderService
  ) {}

  createLoaders(): IDataLoaders {
    return {
      // ...this.assetLoader.createLoaders(),
    };
  }
}
