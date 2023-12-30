import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;
@Schema({ timestamps: true })
@ObjectType()
@Directive('@key(fields: "id")')
export class Otp {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  id: string;

  @Prop({
    required: true,
  })
  @Field()
  email: string;

  @Prop({
    required: true,
  })
  @Field()
  otp: string;

  @Prop({ required: true })
  @Field()
  expiresAt: Date;

  @Prop({
    default: 0,
  })
  attempt: number;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
