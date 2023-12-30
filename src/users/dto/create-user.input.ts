import { InputType, Int, Field } from '@nestjs/graphql';
import { UserType } from '../enum/user-type.enum';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  userName: string;

  @Field()
  password: string;

  @Field(() => UserType)
  type: UserType;
}
