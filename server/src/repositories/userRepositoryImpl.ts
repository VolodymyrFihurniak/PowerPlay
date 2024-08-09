import { PrismaClient } from '@prisma/client';

import { UserRepository } from '@interfaces/userRepository';

class UserRepositoryImpl implements UserRepository {
  constructor(readonly db: PrismaClient) {}
  public getUserByEmail = async (email: string) => {
    return this.db.user.findUnique({
      where: {
        email,
      },
    });
  };
}
