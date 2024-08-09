import { AuthRepository } from '@interfaces/authRepository';

class AuthService {
  constructor(readonly db: AuthRepository) {}
}

export { AuthService };
