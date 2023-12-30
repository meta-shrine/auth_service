import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { MailSenderResolver } from './mail-sender.resolver';

@Module({
  providers: [MailSenderResolver, MailSenderService]
})
export class MailSenderModule {}
