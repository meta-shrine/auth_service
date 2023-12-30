import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MailSenderService } from './mail-sender.service';
import { MailSender } from './entities/mail-sender.entity';
import { CreateMailSenderInput } from './dto/create-mail-sender.input';
import { UpdateMailSenderInput } from './dto/update-mail-sender.input';

@Resolver(() => MailSender)
export class MailSenderResolver {
  constructor(private readonly mailSenderService: MailSenderService) {}

  @Mutation(() => MailSender)
  createMailSender(@Args('createMailSenderInput') createMailSenderInput: CreateMailSenderInput) {
    return this.mailSenderService.create(createMailSenderInput);
  }

  @Query(() => [MailSender], { name: 'mailSender' })
  findAll() {
    return this.mailSenderService.findAll();
  }

  @Query(() => MailSender, { name: 'mailSender' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mailSenderService.findOne(id);
  }

  @Mutation(() => MailSender)
  updateMailSender(@Args('updateMailSenderInput') updateMailSenderInput: UpdateMailSenderInput) {
    return this.mailSenderService.update(updateMailSenderInput.id, updateMailSenderInput);
  }

  @Mutation(() => MailSender)
  removeMailSender(@Args('id', { type: () => Int }) id: number) {
    return this.mailSenderService.remove(id);
  }
}
