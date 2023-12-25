import { Module } from '@nestjs/common';
import { EmailTempleteService } from './email-templete.service';
import { EmailTempleteResolver } from './email-templete.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmailTemplate,
  emailTemplateSchema,
} from './entities/email-templete.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailTemplate.name, schema: emailTemplateSchema },
    ]),
  ],
  providers: [EmailTempleteResolver, EmailTempleteService],
})
export class EmailTempleteModule { }
