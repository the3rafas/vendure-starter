import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Banner } from "./model/banner.model";
import {
  ID,
  InternalServerError,
  TransactionalConnection,
} from "@vendure/core";

@Injectable()
export class BannerRepository {
  private bannerRepo: Repository<Banner>;
  constructor(connect: TransactionalConnection) {
    this.bannerRepo = connect.rawConnection.getRepository(Banner);
  }

  async findOne(id: ID): Promise<Banner> {
    const banner = await this.bannerRepo.findOne({ where: { id } });
    if (!banner) throw new InternalServerError("Banner does not exist");
    return banner;
  }
  async findOneWithPageAndPosition(
    position: number,
    page: number
  ): Promise<boolean> {
    const banner = await this.bannerRepo.findOne({ where: { position, page } });
    if (banner) throw new InternalServerError("Banner already exist");
    return true;
  }

  async delete(id: ID): Promise<boolean> {
    await this.findOne(id);

    return !!(await this.bannerRepo.delete(id));
  }
}
