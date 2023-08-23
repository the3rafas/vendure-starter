import {
  DeepPartial,
  LanguageCode,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Blog } from "./blog.model";
import { Column, Entity, Index, ManyToOne } from "typeorm";

@Entity()
export class BlogTranslation
  extends VendureEntity
  implements Translation<Blog>
{
  constructor(input?: DeepPartial<Translation<Blog>>) {
    super(input);
  }

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Index({ unique: true })
  @Column({ type: "text", unique: true })
  slug: string;

  @Column("varchar") languageCode: LanguageCode;

  @Index()
  @ManyToOne((type) => Blog, (base) => base.translations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  base: Blog;
}
