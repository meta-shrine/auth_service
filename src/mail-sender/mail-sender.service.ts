import { Injectable } from '@nestjs/common';
import { CreateMailSenderInput } from './dto/create-mail-sender.input';
import { UpdateMailSenderInput } from './dto/update-mail-sender.input';

@Injectable()
export class MailSenderService {
  create(createMailSenderInput: CreateMailSenderInput) {
    return 'This action adds a new mailSender';
  }

  findAll() {
    return `This action returns all mailSender`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailSender`;
  }

  update(id: number, updateMailSenderInput: UpdateMailSenderInput) {
    return `This action updates a #${id} mailSender`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailSender`;
  }
}
