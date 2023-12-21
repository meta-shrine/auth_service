import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type TokenDocument = Token & Document;
@Schema({ timestamps: true })
@ObjectType()
@Directive('@key(fields: "id")')
export class Token {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  id: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  userId: Types.ObjectId;

  @Prop()
  @Field(() => String)
  refreshToken: string;

  @Prop()
  @Field(() => String)
  accessToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
