import { AuthRepository } from '@interfaces/authRepository';

class AuthService {
  constructor(readonly db: AuthRepository) {}
  public generateAccessToken = async (payload: string): Promise<JSON.JSONObject> => {
    return this.db.generateAccessToken(payload);
  };
}

export { AuthService };
