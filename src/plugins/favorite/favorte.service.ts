import { Injectable } from "@nestjs/common";
import { RequestContext } from "@vendure/core";
import { FavoriteRepository } from "./infrastructure/favorite.repository";
@Injectable()
export class FavoriteService {
  constructor(private favRepo: FavoriteRepository) {}

  async ToogleFavProduct(
    productId: number,
    customerId: number
  ): Promise<boolean> {
    return await this.favRepo.findOrCreate({ productId, customerId });
  }
}
