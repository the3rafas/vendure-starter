import {
  DeepPartial,
  LanguageCode,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Project } from "./project.model";

@Entity()
export class ProjectTranslation
  extends VendureEntity
  implements Translation<Project>
{
  constructor(input?: DeepPartial<Translation<Project>>) {
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
  @ManyToOne((type) => Project, (base) => base.translations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  base: Project;
}
