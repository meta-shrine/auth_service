import { UserStatusEnum, UserType } from '../enum/user-type.enum';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => UserStatusEnum)
  isEmailVerified: UserStatusEnum;
}
