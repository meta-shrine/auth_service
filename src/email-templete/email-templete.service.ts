import { Injectable } from '@nestjs/common';
import { CreateEmailTempleteInput } from './dto/create-email-templete.input';
import { UpdateEmailTempleteInput } from './dto/update-email-templete.input';
import {
  EmailTemplate,
  EmailTemplateDocument,
} from './entities/email-templete.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EmailTempleteService {
  constructor(
    @InjectModel(EmailTemplate.name)
    private readonly emailTemplate: Model<EmailTemplateDocument>,
  ) { }
  async create(createEmailTempleteInput: CreateEmailTempleteInput) {
    return await this.emailTemplate.create(createEmailTempleteInput);
  }

  async findAll() {
    return await this.emailTemplate.find();
  }

  async findOne(id: string) {
    return await this.emailTemplate.findById(id);
  }

  async update(id: string, updateEmailTempleteInput: UpdateEmailTempleteInput) {
    return await this.emailTemplate.findByIdAndUpdate(
      id,
      updateEmailTempleteInput,
    );
  }

  async remove(id: string) {
    return await this.emailTemplate.findByIdAndDelete(id);
  }
}
