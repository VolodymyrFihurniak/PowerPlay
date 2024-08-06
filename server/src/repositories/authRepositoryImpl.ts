import { PrismaClient } from '@prisma/client';
import { Context } from 'elysia';

import { Config } from '@entities/config';

import {
  AuthContext,
  AuthLogin,
  AuthRegister,
  AuthRepository,
  CustomJWT,
} from '@interfaces/authRepository';

class AuthRepositoryImpl implements AuthRepository {
  constructor(
    readonly db: PrismaClient,
    readonly config: Config,
    readonly jwtAccess?: CustomJWT,
    readonly jwtRefresh?: CustomJWT
  ) {}

  public async generateAccessToken(refreshToken: string): Promise<JSON.JSONObject> {
    const verify = await this.jwtRefresh?.verify(refreshToken);
    if (!verify) {
      throw new Error('RefreshToken is invalid');
    }
    console.log(this.db.authToken.findMany());
    const result = await this.jwtAccess!.sign(verify);
    return { accessToken: result };
  }
}

export { AuthRepositoryImpl };
