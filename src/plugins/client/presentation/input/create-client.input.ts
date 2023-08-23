import { InputType, Field } from "@nestjs/graphql";
import { LanguageInput } from "../../../utils/input/inputs";

@InputType()
export class ClientInput extends LanguageInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  slug: string;

  @Field(() => String, { nullable: false })
  url: string;
}
@InputType()
export class CreateClientInput {
  @Field(() => [ClientInput], { nullable: false })
  data: ClientInput[];
}
