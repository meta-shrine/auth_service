import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import {JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './gql.role.guard';

@Module({
  imports:[PassportModule,UsersModule,JwtModule.register({
    signOptions: {expiresIn:'1800s'}, //TODO env
    secret:'my-secret-xklakldjfkjwqeori-key' //TODO env
  })], 
  providers: [AuthResolver, AuthService, LocalStrategy,JwtStrategy,RolesGuard]
})
export class AuthModule {}
