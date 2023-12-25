import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class ForgetPasswordInput {
  @Field(() => String, {
    description: 'Email of a user to change password request',
  })
  @IsEmail()
  email: string;

  @Field(() => String, {
    description: 'New Password to change password request',
  })
  @IsString()
  password: string;

  @Field(() => String, {
    description: 'New Password to change password request',
  })
  @IsString()
  new_password: string;
}
