import {
  Resolver,
  Mutation,
  Parent,
  ResolveField,
  Query,
  Args,
} from "@nestjs/graphql";
import { Asset, Ctx, RequestContext } from "@vendure/core";

import { UtilsService } from "../..//utils/utils.service";
import { UtilsLoaderService } from "../..//utils/utils.loader.service";
import { BannerService } from "../banner.service";
import { PaginateBanner } from "./input/filter-banner.input";
import { FindBannerInput } from "./input/find-banner.input";
import { Banner } from "../infrastructure/model/banner.model";

@Resolver(Banner)
export class BannerStoreResolver {
  constructor(
    private bannerService: BannerService,
    private utils: UtilsLoaderService
  ) {}

  @Query((type) => [Banner])
  banners(@Args("input") input: PaginateBanner) {
    return this.bannerService.retreveBanners(input);
  }

  @Query((type) => Banner)
  banner(@Args("input") input: FindBannerInput): Promise<Banner> {
    return this.bannerService.retreveBanner(input.bannerId);
  }
  @ResolveField(() => JSON)
  ratio(@Parent() parent: Banner) {
    const ration = parent.ratio.split("-");

    return { row: +ration[1], column: +ration[0] };
  }
}
