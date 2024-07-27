import { PrismaClient } from '@prisma/client';
import { Context } from 'elysia';

import { Config } from '@entities/config';

import { AuthLogin, AuthRegister, AuthRepository, CustomJWT } from '@interfaces/authRepository';

class AuthRepositoryImpl implements AuthRepository {
  constructor(
    // readonly db: PrismaClient,
    readonly config: Config,
    readonly jwt: CustomJWT
  ) {}
  public verify = async (token: string): Promise<JSON.JSONObject | boolean> => {
    return this.jwt.verify(token);
  };
}

export { AuthRepositoryImpl };
