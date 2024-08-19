import type { PrismaClient } from '@prisma/client';

import type { TokenRepository } from '@interfaces/tokenRepository';

class TokenRepositoryImpl implements TokenRepository {
  constructor(readonly db: PrismaClient) {}

  public async saveToken(userId: number, refreshToken: string): Promise<void> {
    const token = await this.db.refreshToken.findFirst({
      where: {
        userId,
      },
    });
    if (token) {
      await this.db.refreshToken.update({
        where: {
          id: token.id,
        },
        data: {
          token: refreshToken,
        },
      });
    } else {
      await this.db.refreshToken.create({
        data: {
          userId,
          token: refreshToken,
        },
      });
    }
  }

  public async removeToken(refreshToken: string): Promise<void> {
    await this.db.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
  }

  public getRefreshTokenId = async (token: string): Promise<number | null> => {
    const result = await this.db.refreshToken.findUnique({
      where: {
        token,
      },
      select: {
        id: true,
      },
    });
    if (!result) {
      return null;
    }
    return result.id;
  };
}

export { TokenRepositoryImpl };
