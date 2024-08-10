import { AuthRegisterDTO } from '@dtos/authDTO';
import { UserDTO } from '@dtos/userDTO';

abstract class UserRepository {
  abstract getUserByEmail(email: string): Promise<UserDTO | null>;
  abstract getUserByNickname(nickname: string): Promise<UserDTO | null>;
  abstract getUserByActivationLink(activationLink: string): Promise<UserDTO | null>;
  abstract createUser(data: AuthRegisterDTO): Promise<UserDTO>;
}

export { UserRepository };
