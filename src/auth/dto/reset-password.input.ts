import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field(() => String, {
    description: 'Email of a user to change password request',
  })
  @IsEmail()
  email: string;
}
