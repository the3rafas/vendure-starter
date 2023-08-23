import {
  Resolver,
  Mutation,
  Parent,
  ResolveField,
  Query,
  Args,
} from "@nestjs/graphql";
import { Blog } from "../infrastructure/model/blog.model";
import { BlogService } from "../blog.service";
import { Asset, Ctx, RequestContext } from "@vendure/core";
import { PaginateBlog } from "./input/filter-blog.input";
import { FindBlogInput } from "./input/find-blog.input";
import { Loader } from "../../_common/decorators/dataloader";
import { IDataLoaders } from "../../_common/dataloader/dataloader.interface";
import { UtilsService } from "src/plugins/utils/utils.service";
import { UtilsLoaderService } from "src/plugins/utils/utils.loader.service";

@Resolver(Blog)
export class BlogStoreResolver {
  constructor(private blogService: BlogService,
    private utils: UtilsLoaderService
    ) {}

  @Query((type) => [Blog])
  Blogs(@Args("input") input: PaginateBlog) {
    return this.blogService.retriveBlogs(input);
  }

  @Query((type) => Blog)
  Blog(@Args("input") input: FindBlogInput): Promise<Blog> {
    return this.blogService.retriveBlog(input.blogId);
  }

  @ResolveField((type) => Asset, { nullable: true })
  async assets(@Parent() blog: Blog, @Loader() loaders: IDataLoaders) {
    console.log(await this.utils.assets);

    return null;
  }
}
