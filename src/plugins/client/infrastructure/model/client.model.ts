import { DeepPartial } from "@vendure/common/lib/shared-types";
import {
  Channel,
  Translation,
  VendureEntity,
} from "@vendure/core";
import { Column, Entity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { ClientTranslation } from "./client-translation";

@Entity()
export class Client extends VendureEntity {
  constructor(input?: DeepPartial<Client>) {
    super(input);
  }

  name: string;

  // @Column({ type: "text" })
  url: string;

  slug: string;

  @OneToMany((type) => ClientTranslation, (translation) => translation.base, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  translations: Array<Translation<Client>>;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
