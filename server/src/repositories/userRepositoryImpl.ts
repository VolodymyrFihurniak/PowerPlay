import { PrismaClient } from '@prisma/client';

import { AuthRegisterDTO } from '@dtos/authDTO';
import { UserDTO } from '@dtos/userDTO';

import { UserRepository } from '@interfaces/userRepository';

class UserRepositoryImpl implements UserRepository {
  constructor(readonly db: PrismaClient) {}

  public getUserByEmail = async (email: string): Promise<UserDTO | null> => {
    const result = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    if (!result) {
      return null;
    }
    return UserDTO.toDTO(result);
  };

  public getUserByNickname = async (nickname: string): Promise<UserDTO | null> => {
    const result = await this.db.user.findUnique({
      where: {
        nickname,
      },
    });
    if (!result) {
      return null;
    }
    return UserDTO.toDTO(result);
  };

  public createUser = async (data: AuthRegisterDTO): Promise<UserDTO> => {
    const result = await this.db.user.create({
      data: {
        firstname: data.firstName,
        secondname: data.secondName,
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        activationLink: data.activationLink!,
      },
    });
    return UserDTO.toDTO(result);
  };
}

export { UserRepositoryImpl };
