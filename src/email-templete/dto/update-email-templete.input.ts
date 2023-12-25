import { CreateEmailTempleteInput } from './create-email-templete.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmailTempleteInput extends PartialType(
  CreateEmailTempleteInput,
) {
  @Field(() => String)
  id: string;
}
