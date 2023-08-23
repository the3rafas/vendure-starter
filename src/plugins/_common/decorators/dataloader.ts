// loaders: this.dataloaderService.createLoaders(currentUser)
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestContext } from "@vendure/core";
import { DataloaderService } from "../dataloader/dataloader.service";
import { IDataLoaders } from "../dataloader/dataloader.interface";
import { BlogLoader } from "../../blog/presentation/dataloader/blog.loader";

export const Loader = createParamDecorator<IDataLoaders>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as RequestContext;
    return new DataloaderService(BlogLoader as any).createLoaders();
  }
);
