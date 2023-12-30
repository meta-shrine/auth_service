import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedBackModule } from './feed-back/feed-back.module';
import { EmailTempleteModule } from './email-templete/email-templete.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rojitebpearls:oxpGF7Ew5g49ifwv@cluster0.smreyq3.mongodb.net/pancake-auth',
    ),
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost/caan-mis-auth'),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      // buildSchemaOptions: {
      //   orphanedTypes: [Office],
      // },
    }),
    UsersModule,
    AuthModule,
    FeedBackModule,
    EmailTempleteModule,
    MailSenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
