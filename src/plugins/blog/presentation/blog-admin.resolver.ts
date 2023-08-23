import {
  Resolver,
  Mutation,
  Query,
  Parent,
  ResolveField,
  Args,
} from "@nestjs/graphql";
import { Blog } from "../infrastructure/model/blog.model";
import { BlogService } from "../blog.service";
import { BlogInput } from "./input/create-blog.input";
import { FindBlogInput } from "./input/find-blog.input";
import { Allow, Asset, Ctx, RequestContext } from "@vendure/core";
import { Create_Blog, Delete_Blog } from "./blog.permission";
import { Loader } from "../../_common/decorators/dataloader";
import { IDataLoaders } from "../../_common/dataloader/dataloader.interface";

@Resolver()
export class BlogAdminResolver {
  constructor(private clientService: BlogService) {}

  @Allow(Create_Blog.Permission)
  @Mutation((type) => Blog)
  createBlog(
    @Args("input") input: BlogInput,
    @Ctx() ctx: RequestContext
  ): Promise<Blog> {
    return this.clientService.createBlog(input, ctx);
  }

  @Allow(Delete_Blog.Permission)
  @Mutation((type) => Boolean)
  deleteBlog(@Args("input") input: FindBlogInput): Promise<Boolean> {
    return this.clientService.deleteBlog(input.blogId);
  }
}
