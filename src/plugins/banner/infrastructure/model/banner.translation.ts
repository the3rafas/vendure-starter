import {
  Asset,
  DeepPartial,
  LanguageCode,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Banner } from "./banner.model";

@Entity()
export class BannerTranslation
  extends VendureEntity
  implements Translation<Banner>
{
  constructor(input?: DeepPartial<Translation<Banner>>) {
    super(input);
  }

  @Column("varchar") languageCode: LanguageCode;
  @Column("varchar") asset: string;

  // @Index()
  // @ManyToOne((type) => Asset, { onDelete: "SET NULL" })
  // featuredAsset: Asset;

  @Index()
  @ManyToOne((type) => Banner, (base) => base.translations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  base: Banner;
}
