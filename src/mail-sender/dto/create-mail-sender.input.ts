import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMailSenderInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
