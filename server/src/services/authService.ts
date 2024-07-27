import { AuthRepository } from '@interfaces/authRepository';

class AuthService {
  constructor(readonly db: AuthRepository) {}
  public verify = async (token: string) => {
    return await this.db.verify(token);
  };
}

export { AuthService };
