import { PrismaClient } from '@prisma/client';

import { AuthRegister } from '@entities/auth';
import { Config } from '@entities/config';
import { User } from '@entities/user';

import { AuthContext, CustomJWT } from '@interfaces/authRepository';

import { TokenRepositoryImpl } from '@repositories/tokenRepositoryImpl';
import { UserRepositoryImpl } from '@repositories/userRepositoryImpl';

import { MailService } from '@services/mailService';
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
      new MailService(),
      new TokenService(new TokenRepositoryImpl(this.dbClient), jwtAccess, jwtRefresh)
    );
  };

  public register = async (
    ctx: AuthContext
  ): Promise<Record<string, string | User>> => {
    try {
      const authRegister = ctx.body as AuthRegister;
      const userService = await this.buildUserService(ctx.jwtAccess!, ctx.jwtRefresh!);
      return await userService.registration(authRegister);
    } catch (error) {
      ctx.set.status = 400;
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: 'Unknown error' };
      }
    }
  };
}

export { AuthController };
