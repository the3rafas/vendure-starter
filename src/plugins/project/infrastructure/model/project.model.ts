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
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { ProjectTranslation } from "./project-translation";
// import { BlogTranslation } from "./blog.translation";
// import { BlogAsset } from "./blogAssit";

@Entity()
export class Project extends VendureEntity {
  constructor(input?: DeepPartial<Project>) {
    super(input);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index()
  @ManyToOne((type) => Asset, { onDelete: "SET NULL" })
  featuredAsset: Asset;

  @OneToMany((type) => ProjectTranslation, (translation) => translation.base, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  translations: Array<Translation<Project>>;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
