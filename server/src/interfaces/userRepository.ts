import { UserDTO } from '@dtos/userDTO';

import { AuthRegister } from '@entities/auth';

abstract class UserRepository {
  abstract getUserByEmail(email: string): Promise<UserDTO>;
  abstract getUserByNickname(nickname: string): Promise<string>;
  abstract createUser(data: AuthRegister): Promise<UserDTO>;
}

export { UserRepository };
