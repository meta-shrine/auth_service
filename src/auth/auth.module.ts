import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './gql.role.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './entity/token.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'my-secret-xklakldjfkjwqeori-key', //TODO env
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AuthModule { }
