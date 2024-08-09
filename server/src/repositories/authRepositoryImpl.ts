import { PrismaClient } from '@prisma/client';

import { Config } from '@entities/config';

import { AuthRepository, CustomJWT } from '@interfaces/authRepository';

class AuthRepositoryImpl implements AuthRepository {
  constructor(
    readonly db: PrismaClient,
    readonly config: Config,
    readonly jwtAccess?: CustomJWT,
    readonly jwtRefresh?: CustomJWT
  ) {}

  public async generateAccessToken(refreshToken: string): Promise<JSON.JSONObject> {
    const refreshTokenId = await this.db.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });
    if (!refreshTokenId) {
      throw new Error('RefreshToken is invalid');
    }
    const verify = await this.jwtRefresh?.verify(refreshToken);
    if (!verify) {
      throw new Error('RefreshToken is invalid');
    }
    const result = await this.jwtAccess!.sign(verify);
    await this.db.accessToken.create({
      data: {
        userId: refreshTokenId.userId,
        token: result,
        refreshTokenId: refreshTokenId.id,
      },
    });
    return { accessToken: result };
  }
}

export { AuthRepositoryImpl };
