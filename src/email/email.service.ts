import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';

@Injectable()
export class EmailService {
  transporter;
  viewPath: string;
  mailerConfig: {
    host: any;
    port?: number;
    secure: boolean;
    auth: { user: any; pass: any };
  };
  mailerOptions: {
    viewEngine: {
      extName: string;
      layoutsDir: string;
      defaultLayout: boolean;
    };
    viewPath: string;
    extName: string;
  };

  constructor(
    @Inject(forwardRef(() => ConfigService)) configService: ConfigService,
  ) {
    /* setup nodemailer config */
    this.mailerConfig = {
      // service: configService.get('EMAIL_HOST'),
      host: configService.get('EMAIL_HOST'),
      port: 465,
      secure: true,
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_USER_PASS'),
      },
    };

    /* configure nodemailer options */
    this.viewPath = path.join(__dirname, '../../../views/templates/');
    this.mailerOptions = {
      viewEngine: {
        extName: '.hbs',
        layoutsDir: this.viewPath,
        defaultLayout: false,
      },
      viewPath: this.viewPath,
      extName: '.hbs',
    };
  }

  async createTransporter() {
    const transporter = nodemailer.createTransport(this.mailerConfig);
    this.transporter = transporter.use('compile', hbs(this.mailerOptions));
  }

  async triggerEmail({
    email,
    subject,
    template,
    emailVariables: { name, link },
    html,
  }) {
    this.createTransporter();
    await this.transporter.sendMail({
      from: 'support@cms.com', // sender address
      to: email,
      subject,
      template,
      html,
    });
  }
}
