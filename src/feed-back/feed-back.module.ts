import { Module } from '@nestjs/common';
import { FeedBackService } from './feed-back.service';
import { FeedBackResolver } from './feed-back.resolver';

@Module({
  providers: [FeedBackResolver, FeedBackService]
})
export class FeedBackModule {}
