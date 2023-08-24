import {
  Resolver,
  Mutation,
  Query,
  Parent,
  ResolveField,
  Args,
} from "@nestjs/graphql";
import { Allow, Asset, Json, Ctx, RequestContext } from "@vendure/core";
import { BannerService } from "../banner.service";
import { Banner } from "../infrastructure/model/banner.model";
import { BannerInput } from "./input/create-banner.input";
import { FindBannerInput } from "./input/find-banner.input";
import { Create_Banner, Delete_Banner } from "./banner.permission";

@Resolver()
export class BannerAdminResolver {
  constructor(private bannerService: BannerService) {}

  @Allow(Create_Banner.Permission)
  @Mutation((type) => Banner)
  createBanner(
    @Args("input") input: BannerInput,
    @Ctx() ctx: RequestContext
  ): Promise<Banner> {
    return this.bannerService.createOne(input, ctx);
  }

  @Allow(Delete_Banner.Permission)
  @Mutation((type) => Boolean)
  deleteBanner(@Args("input") input: FindBannerInput): Promise<Boolean> {
    return this.bannerService.deleteBanner(input.bannerId);
  }

}
