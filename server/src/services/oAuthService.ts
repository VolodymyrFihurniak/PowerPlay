import { Auth } from 'googleapis';

import { Config } from '@entities/config';

class OAuthService {
  private oAuth2!: Auth.OAuth2Client;
  private static instance: OAuthService;
  constructor(readonly config: Config) {
    if (OAuthService.instance) {
      return OAuthService.instance;
    }
    this.oAuth2 = new Auth.OAuth2Client(
      config.oauthClientID,
      config.oauthClientSecret,
      'https://developers.google.com/oauthplayground'
    );
    this.oAuth2.setCredentials({
      refresh_token: config.oauthClientRefreshToken,
    });
  }

  public getAccessToken = async (): Promise<string> => {
    const { token } = await this.oAuth2.getAccessToken();
    if (token) {
      return token.toString();
    }
    throw new Error('Failed to get access token');
  };
}

export { OAuthService };
