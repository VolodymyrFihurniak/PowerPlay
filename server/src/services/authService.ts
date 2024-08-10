import { AuthRepository } from '@interfaces/authRepository';
import { UserRepository } from '@interfaces/userRepository';

class AuthService {
  constructor(
    readonly authDB: AuthRepository,
    readonly userDB: UserRepository
  ) {}
}

export { AuthService };
