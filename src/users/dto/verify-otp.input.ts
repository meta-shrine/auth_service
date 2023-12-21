import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class VerifyOtp {
  @Field()
  email: string;

  @Field()
  otp: string;
}
