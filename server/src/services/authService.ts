import { ApiError } from '@errors/apiError';

import { AuthRepository } from '@interfaces/authRepository';
import { UserRepository } from '@interfaces/userRepository';

class AuthService {
  constructor(
    readonly authDB: AuthRepository,
    readonly userDB: UserRepository
  ) {}

  public activate = async (link: string) => {
    const user = await this.userDB.getUserByActivationLink(link);
    if (!user) {
      throw ApiError.BadRequest('Activation link is not valid');
    }
    await this.authDB.activate(link);
  };
}

export { AuthService };
