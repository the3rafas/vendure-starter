import { Injectable } from "@nestjs/common";
import {
  AssetService,
  ChannelService,
  ID,
  RequestContext,
  TranslatableSaver,
} from "@vendure/core";
import { BannerRepository } from "./infrastructure/banner,repositiory";
import { UtilsService } from "../utils/utils.service";
import { Banner } from "./infrastructure/model/banner.model";
import { BannerInput } from "./presentation/input/create-banner.input";
import { BannerTranslation } from "./infrastructure/model/banner.translation";
import { PaginateBanner } from "./presentation/input/filter-banner.input";
@Injectable()
export class BannerService {
  constructor(
    private readonly bannerRepo: BannerRepository,
    private translateSaver: TranslatableSaver,
    private channelService: ChannelService,
    private utils: UtilsService,
    private assetService: AssetService
  ) {}

  async createOne(input: BannerInput, ctx: RequestContext) {
    await this.bannerRepo.findOneWithPageAndPosition(
      input.position,
      input.page
    );
    const banner = await this.translateSaver.create({
      ctx,
      entityType: Banner,
      translationType: BannerTranslation,
      input,
      beforeSave: async (banner) => {
        await this.channelService.assignToCurrentChannel(banner, ctx);
        // await this.assetService.updateFeaturedAsset(ctx, banner, input as any);
      },
    });
    return banner;
  }
  async retreveBanners(input: PaginateBanner): Promise<Banner[]> {
    return await this.utils.listEntityPagination(
      Banner,
      [], //"featuredAsset"
      input?.filter,
      input?.page,
      input?.page
    );
  }
  async retreveBanner(id: ID): Promise<Banner> {
    return await this.bannerRepo.findOne(id);
  }
  async deleteBanner(id: ID): Promise<boolean> {
    return await this.bannerRepo.delete(id);
  }
}
