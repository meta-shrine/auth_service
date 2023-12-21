import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeedBackService } from './feed-back.service';
import { FeedBack } from './entities/feed-back.entity';
import { CreateFeedBackInput } from './dto/create-feed-back.input';
import { UpdateFeedBackInput } from './dto/update-feed-back.input';

@Resolver(() => FeedBack)
export class FeedBackResolver {
  constructor(private readonly feedBackService: FeedBackService) {}

  @Mutation(() => FeedBack)
  createFeedBack(@Args('createFeedBackInput') createFeedBackInput: CreateFeedBackInput) {
    return this.feedBackService.create(createFeedBackInput);
  }

  @Query(() => [FeedBack], { name: 'feedBack' })
  findAll() {
    return this.feedBackService.findAll();
  }

  @Query(() => FeedBack, { name: 'feedBack' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.feedBackService.findOne(id);
  }

  @Mutation(() => FeedBack)
  updateFeedBack(@Args('updateFeedBackInput') updateFeedBackInput: UpdateFeedBackInput) {
    return this.feedBackService.update(updateFeedBackInput.id, updateFeedBackInput);
  }

  @Mutation(() => FeedBack)
  removeFeedBack(@Args('id', { type: () => Int }) id: number) {
    return this.feedBackService.remove(id);
  }
}
