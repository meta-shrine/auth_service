import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserType } from '../enum/user-type.enum';

export type UserDocument = User & Document;
@Schema()
@ObjectType()
@Directive('@key(fields: "id")')
export class User {
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
  username: string;

  @Prop({
    required: true,
  })
  @Field()
  password: string;

  @Prop({
    required: true,
    enum: UserType,
    default: UserType.USER,
  })
  @Field(() => UserType)
  type: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
