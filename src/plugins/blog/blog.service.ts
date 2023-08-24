import { Injectable } from "@nestjs/common";
import { BlogRepository } from "./infrastructure/blog.repository";
import { BlogInput } from "./presentation/input/create-blog.input";
import { Blog } from "./infrastructure/model/blog.model";
import {
  AssetService,
  ChannelService,
  ID,
  InternalServerError,
  LanguageCode,
  ListQueryBuilder,
  PaginatedList,
  RequestContext,
  TranslatableSaver,
  Translated,
} from "@vendure/core";
import { BlogTranslation } from "./infrastructure/model/blog.translation";
import { UtilsService } from "../utils/utils.service";
import { PaginationInput } from "../utils/input/inputs";
import { PaginateBlog } from "./presentation/input/filter-blog.input";
@Injectable()
export class BlogService {
  private readonly relations = ["translations", "channels"];

  constructor(
    private blogRepo: BlogRepository,
    private translateSaver: TranslatableSaver,
    private channelService: ChannelService,
    private assetService: AssetService,
    private utils: UtilsService
  ) {}

  async createBlog(input: BlogInput, ctx: RequestContext): Promise<Blog> {
    await this.utils.validateSlug(Blog, [
      input.slug,
      ...input.translations.map((e) => e.slug),
    ]);
    const blog = await this.translateSaver.create({
      ctx,
      entityType: Blog,
      input,
      translationType: BlogTranslation,
      beforeSave: async (blog) => {
        await this.channelService.assignToCurrentChannel(blog, ctx);
        await this.assetService.updateFeaturedAsset(ctx, blog, input);
      },
    });
    await this.assetService.updateEntityAssets(ctx, blog, input);
    console.log(blog);

    return blog;
    // return await this.blogRepo.createOne(input);
  }
  async retriveBlogs(
    data: PaginateBlog
  ): Promise<PaginatedList<Translated<Blog>>> {
    // data.filter
    return await this.utils.listEntityPagination<Blog>(
      Blog,
      ["featuredAsset", "assets"],
      data.filter,
      data.page,
      data.limit
    );
  }
  async retriveBlog(id: ID): Promise<Blog> {
    return await this.blogRepo.findOne(id);
  }
  async deleteBlog(blogId: number): Promise<Boolean> {
    const blog = await this.blogRepo.findOne(blogId);
    if (!blog) throw new InternalServerError("Blog Does Not Exist");
    return await this.blogRepo.delete(blogId);
  }
}
