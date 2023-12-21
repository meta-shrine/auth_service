import { Test, TestingModule } from '@nestjs/testing';
import { FeedBackResolver } from './feed-back.resolver';
import { FeedBackService } from './feed-back.service';

describe('FeedBackResolver', () => {
  let resolver: FeedBackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedBackResolver, FeedBackService],
    }).compile();

    resolver = module.get<FeedBackResolver>(FeedBackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
