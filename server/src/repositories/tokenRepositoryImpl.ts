import { PrismaClient } from '@prisma/client';

import { TokenRepository } from '@interfaces/tokenRepository';

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
}

export { TokenRepositoryImpl };
