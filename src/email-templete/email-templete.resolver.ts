import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmailTempleteService } from './email-templete.service';
import { EmailTemplate } from './entities/email-templete.entity';
import { CreateEmailTempleteInput } from './dto/create-email-templete.input';
import { UpdateEmailTempleteInput } from './dto/update-email-templete.input';

@Resolver(() => EmailTemplate)
export class EmailTempleteResolver {
  constructor(private readonly emailTempleteService: EmailTempleteService) { }

  @Mutation(() => EmailTemplate)
  createEmailTemplete(
    @Args('createEmailTempleteInput')
    createEmailTempleteInput: CreateEmailTempleteInput,
  ) {
    return this.emailTempleteService.create(createEmailTempleteInput);
  }

  @Query(() => [EmailTemplate], { name: 'emailTemplete' })
  findAll() {
    return this.emailTempleteService.findAll();
  }

  @Query(() => EmailTemplate, { name: 'emailTemplete' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.emailTempleteService.findOne(id);
  }

  @Mutation(() => EmailTemplate)
  updateEmailTemplete(
    @Args('updateEmailTempleteInput')
    updateEmailTempleteInput: UpdateEmailTempleteInput,
  ) {
    return this.emailTempleteService.update(
      updateEmailTempleteInput.id,
      updateEmailTempleteInput,
    );
  }

  @Mutation(() => EmailTemplate)
  removeEmailTemplete(@Args('id', { type: () => String }) id: string) {
    return this.emailTempleteService.remove(id);
  }
}
