import { PrismaClient } from '@prisma/client';

import { AuthRegister } from '@entities/auth';
import { Config } from '@entities/config';
import { User } from '@entities/user';

import { AuthContext, CustomJWT } from '@interfaces/authRepository';

import { AuthRepositoryImpl } from '@repositories/authRepositoryImpl';
import { TokenRepositoryImpl } from '@repositories/tokenRepositoryImpl';
import { UserRepositoryImpl } from '@repositories/userRepositoryImpl';

import { AuthService } from '@services/authService';
import { MailService } from '@services/mailService';
import { OAuthService } from '@services/oAuthService';
import { TokenService } from '@services/tokenService';
import { UserService } from '@services/userService';

class AuthController {
  constructor(
    readonly config: Config,
    readonly dbClient: PrismaClient
  ) {}

  public buildUserService = async (jwtAccess: CustomJWT, jwtRefresh: CustomJWT) => {
    return new UserService(
      new UserRepositoryImpl(this.dbClient),
      new MailService(this.config, new OAuthService(this.config)),
      new TokenService(new TokenRepositoryImpl(this.dbClient), jwtAccess, jwtRefresh)
    );
  };

  public buildAuthService = async () => {
    return new AuthService(
      new AuthRepositoryImpl(this.dbClient),
      new UserRepositoryImpl(this.dbClient)
    );
  };

  public register = async ({
    body,
    set,
    cookie: { refreshToken },
    jwtAccess,
    jwtRefresh,
    request: { url },
  }: AuthContext): Promise<Record<string, string | User>> => {
    try {
      const authRegister = body as AuthRegister;
      const userService = await this.buildUserService(jwtAccess!, jwtRefresh!);
      url = url.replace(/\/auth\/register/, '');
      const result = await userService.registration(authRegister, url);
      refreshToken.set({
        value: result.refreshToken,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
      });
      return result;
    } catch (error) {
      set.status = 400;
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: 'Unknown error' };
      }
    }
  };

  public activate = async ({
    query: { link },
  }: AuthContext): Promise<JSON.JSONObject> => {
    try {
      return { message: 'User activated' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: 'Unknown error' };
      }
    }
  };
}

export { AuthController };
