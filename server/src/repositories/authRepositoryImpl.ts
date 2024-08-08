import { PrismaClient } from '@prisma/client';

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
    // await this.db.accessToken.create({
    //   data: {
    //     userId: verify.userId,
    //   },
    // });
    const result = await this.jwtAccess!.sign(verify);
    return { accessToken: result };
  }
}

export { AuthRepositoryImpl };
