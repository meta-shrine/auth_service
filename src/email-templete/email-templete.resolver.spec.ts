import { Test, TestingModule } from '@nestjs/testing';
import { EmailTempleteResolver } from './email-templete.resolver';
import { EmailTempleteService } from './email-templete.service';

describe('EmailTempleteResolver', () => {
  let resolver: EmailTempleteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailTempleteResolver, EmailTempleteService],
    }).compile();

    resolver = module.get<EmailTempleteResolver>(EmailTempleteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
