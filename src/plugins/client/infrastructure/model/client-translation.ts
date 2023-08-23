import {
  DeepPartial,
  HasCustomFields,
  LanguageCode,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Client } from "./client.model";

@Entity()
export class ClientTranslation
  extends VendureEntity
  implements Translation<Client>
{
  constructor(input?: DeepPartial<Translation<Client>>) {
    super(input);
  }

  @Column("varchar") languageCode: LanguageCode;

  @Column() name: string;
  @Column() url: string;

  @Index({ unique: true })
  @Column({
    unique: true,
  })
  slug: string;

  @Index()
  @ManyToOne((type) => Client, (base) => base.translations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  base: Client;
}
