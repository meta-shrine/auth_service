import { CreateMailSenderInput } from './create-mail-sender.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMailSenderInput extends PartialType(CreateMailSenderInput) {
  @Field(() => Int)
  id: number;
}
