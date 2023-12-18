import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  ADMIN,
  CONTENT_CREATER,
  USER,
  CORPORATE,
}

registerEnumType(UserType, {
  name: 'UserType',
});
