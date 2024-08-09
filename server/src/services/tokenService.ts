import { AuthPayload } from '@entities/auth';

import { CustomJWT } from '@interfaces/authRepository';
import { TokenRepository } from '@interfaces/tokenRepository';

class TokenService {
  constructor(
    readonly db: TokenRepository,
    readonly jwtAccess: CustomJWT,
    readonly jwtRefresh: CustomJWT
  ) {}

  public generateTokens = async (payload: AuthPayload) => {
    const accessToken = await this.jwtAccess.sign({ ...payload });
    const refreshToken = await this.jwtRefresh.sign({ ...payload });
    return { accessToken, refreshToken };
  };

  public saveToken = async (userId: number, refreshToken: string) => {
    return await this.db.saveToken(userId, refreshToken);
  };
}

export { TokenService };
