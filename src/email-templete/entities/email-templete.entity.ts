import { Field, ObjectType } from '@nestjs/graphql';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

enum Status {
  LIVE = 'live',
  DRAFT = 'draft',
}
export type EmailTemplateDocument = EmailTemplate & Document;

@ObjectType()
@Schema({ timestamps: true })
export class EmailTemplate {
  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String)
  @Prop({ required: true })
  slug: string;

  @Field(() => String)
  @Prop({ required: true })
  subject: string;

  @Field(() => String)
  @Prop({ required: true, enum: [Status.LIVE, Status.DRAFT] })
  status: string;

  @Field(() => String)
  @Prop({ required: true })
  body: string;

  @Field(() => String)
  @Prop({ required: true })
  keys: string[];

  @Field(() => String)
  @Prop({ ref: 'Admins', type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId;
}

export const emailTemplateSchema = SchemaFactory.createForClass(EmailTemplate);
