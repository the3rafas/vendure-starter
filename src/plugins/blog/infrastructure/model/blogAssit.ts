import { DeepPartial, ID } from "@vendure/common/lib/shared-types";
import { Column, Entity, Index, ManyToOne } from "typeorm";

import { Blog } from "./blog.model";
import { OrderableAsset } from "@vendure/core/dist/entity/asset/orderable-asset.entity";

@Entity()
export class BlogAsset extends OrderableAsset {
  constructor(input?: DeepPartial<BlogAsset>) {
    super(input);
  }
  @Column()
  blogId: ID;

  @Index()
  @ManyToOne((type) => Blog, (blog) => blog.assets, { onDelete: "CASCADE" })
  blog: Blog;
}
