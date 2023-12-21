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

export enum UserStatusEnum {
  PENDING,
  VERIFIFED,
}

registerEnumType(UserStatusEnum, {
  name: 'UserStatus',
});
