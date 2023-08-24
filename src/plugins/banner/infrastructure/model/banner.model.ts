import { DeepPartial } from "@vendure/common/lib/shared-types";
import {
  Channel,
  Translated,
  Translation,
  PaginatedList,
  VendureEntity,
  Asset,
} from "@vendure/core";
import {
  Column,
  Entity,
  ManyToOne,
  Index,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { BannerTranslation } from "./banner.translation";

@Entity()
export class Banner extends VendureEntity {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }
  @Column() position: number;
  @Column() page: number;
  @Column() ratio: string;

  // @Index()
  // @ManyToOne((type) => Asset, { onDelete: "SET NULL" })
  // featuredAsset: Asset;

  @OneToMany((type) => BannerTranslation, (translation) => translation.base, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  translations: Array<Translation<Banner>>;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
