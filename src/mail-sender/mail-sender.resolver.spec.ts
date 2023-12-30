import { Test, TestingModule } from '@nestjs/testing';
import { MailSenderResolver } from './mail-sender.resolver';
import { MailSenderService } from './mail-sender.service';

describe('MailSenderResolver', () => {
  let resolver: MailSenderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailSenderResolver, MailSenderService],
    }).compile();

    resolver = module.get<MailSenderResolver>(MailSenderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
