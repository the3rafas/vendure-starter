import { DeepPartial } from "@vendure/common/lib/shared-types";
import {
  Asset,
  Channel,
  ProductAsset,
  Translation,
  VendureEntity,
} from "@vendure/core";
import {
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { BlogTranslation } from "./blog.translation";
import { BlogAsset } from "./blogAssit";

@Entity()
export class Blog extends VendureEntity {
  constructor(input?: DeepPartial<Blog>) {
    super(input);
  }
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index()
  @ManyToOne((type) => Asset, { onDelete: "SET NULL" })
  featuredAsset: Asset;

  @OneToMany((type) => BlogTranslation, (translation) => translation.base, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  translations: Array<Translation<Blog>>;

  @OneToMany((type) => BlogAsset, (blogAsset) => blogAsset.blog)
  assets: BlogAsset[];

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
