import nodemailer from 'nodemailer';

import { Config } from '@entities/config';

import { OAuthService } from './oAuthService';

class MailService {
  constructor(
    readonly config: Config,
    readonly oAuthService: OAuthService
  ) {}

  public generateTransport = async (): Promise<nodemailer.Transporter> => {
    const accessToken = await this.oAuthService.getAccessToken();
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.config.oauthUser,
        clientId: this.config.oauthClientID,
        clientSecret: this.config.oauthClientSecret,
        refreshToken: this.config.oauthClientRefreshToken,
        accessToken,
      },
    });
  };

  public sendActivationMail = async (to: string, link: string) => {
    console.log(`Activation link: ${link}`);
    const transporter = await this.generateTransport();
    await transporter.sendMail({
      from: this.config.oauthUser,
      to,
      subject: 'Account Activation',
      html: `Click <a href="${link}">here</a> to activate your account.`,
    });
  };
}

export { MailService };
