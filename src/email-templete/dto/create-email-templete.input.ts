import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@InputType()
export class CreateEmailTempleteInput {
  @IsNotEmpty()
  @Field()
  title: string;
  @IsNotEmpty()
  @Field()
  slug: string;
  @IsNotEmpty()
  @Field()
  subject: string;
  @IsNotEmpty()
  @Field()
  body: string;
  @IsNotEmpty()
  @Field()
  status: string;
}
