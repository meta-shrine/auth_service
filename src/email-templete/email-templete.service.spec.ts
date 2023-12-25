import { Test, TestingModule } from '@nestjs/testing';
import { EmailTempleteService } from './email-templete.service';

describe('EmailTempleteService', () => {
  let service: EmailTempleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailTempleteService],
    }).compile();

    service = module.get<EmailTempleteService>(EmailTempleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
