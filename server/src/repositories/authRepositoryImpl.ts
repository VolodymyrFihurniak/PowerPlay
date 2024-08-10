import { PrismaClient } from '@prisma/client';

import { AuthRepository } from '@interfaces/authRepository';

class AuthRepositoryImpl implements AuthRepository {
  constructor(readonly db: PrismaClient) {}
  public activate = async (link: string) => {
    await this.db.user.update({
      where: {
        activationLink: link,
      },
      data: {
        isActivated: true,
      },
    });
  };
}

export { AuthRepositoryImpl };
