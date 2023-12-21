import { CreateFeedBackInput } from './create-feed-back.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFeedBackInput extends PartialType(CreateFeedBackInput) {
  @Field(() => Int)
  id: number;
}
