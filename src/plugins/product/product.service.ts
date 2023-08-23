import {
  ID,
  ProductVariant,
  RequestContext,
  TransactionalConnection,
  ProductService as VendureProductService,
} from "@vendure/core";
import { Injectable } from "@nestjs/common";
import { ProductVariantRepository } from "./infrastructure/product-variant.repository";
import { In } from "typeorm";

@Injectable()
//extends VendureProductService
export class ProductService {
  constructor(
    private connection: TransactionalConnection,
    private variantRepo: ProductVariantRepository
  ) {
    //     super();
  }
//TODO: filter single product 
  async filterSingleProduct(
    ctx: RequestContext,
    productId: ID,
    options: { groupId: ID; optionId: ID }[] = []
  ): Promise<any> {
    const optionArr = options.map((e) => e.optionId);
    let variants = (await this.variantRepo.findVariantSingleProduct(
      productId,
      optionArr
    )) as ProductVariant[];

    let variant = variants.find((variant) => {
      const variantOptions = variant.options.map((option) => option.id);

      return variantOptions.length === optionArr.length;
    }) as ProductVariant;

    if (!variant) variant = variants[0];
    variant = (await this.variantRepo.findOne(variant?.id, [
      "translations",
      "options",
      "options.group",
      "featuredAsset",
      "assets",
    ])) as ProductVariant;
    const variantOptions = variant?.options.map(
      (e) =>
        e.translations.find((x) => x.languageCode === ctx.languageCode)?.name
    );

    return { productvariant: variant, options: variantOptions };
  }
}
