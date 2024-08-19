import type { AuthPayload } from '@entities/auth';

import type { CustomJWT } from '@interfaces/authRepository';
import type { TokenRepository } from '@interfaces/tokenRepository';
import type { UserRepository } from '@interfaces/userRepository';

class TokenService {
  constructor(
    readonly db: TokenRepository,
    readonly userDB: UserRepository,
    readonly jwtAccess: CustomJWT,
    readonly jwtRefresh: CustomJWT
  ) {}

  public generateAccessToken = async (payload: AuthPayload) => {
    return await this.jwtAccess.sign({ ...payload });
  };

  public generateRefreshToken = async (payload: AuthPayload) => {
    return await this.jwtRefresh.sign({ ...payload });
  };

  public generateTokens = async (payload: AuthPayload) => {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  };

  public saveToken = async (userId: number, refreshToken: string) => {
    return await this.db.saveToken(userId, refreshToken);
  };

  public removeToken = async (refreshToken: string) => {
    return await this.db.removeToken(refreshToken);
  };
}

export { TokenService };
