import { AuthPayload } from '@entities/auth';

import { ApiError } from '@errors/apiError';

import { CustomJWT } from '@interfaces/authRepository';
import { TokenRepository } from '@interfaces/tokenRepository';
import { UserRepository } from '@interfaces/userRepository';

class TokenService {
  constructor(
    readonly db: TokenRepository,
    readonly userDB: UserRepository,
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

  public removeToken = async (refreshToken: string) => {
    return await this.db.removeToken(refreshToken);
  };

  public refreshTokens = async (refreshToken: string) => {
    const userData = await this.jwtRefresh.verify(refreshToken);
    if (!userData || typeof userData === 'boolean') {
      throw ApiError.Unauthorized('Invalid refresh token');
    }
    const userDataDB = await this.userDB.getUserById(Number(userData.userId));
    if (!userDataDB) {
      throw ApiError.Unauthorized('Invalid refresh token in DB');
    }
    await this.removeToken(refreshToken);
    return await this.generateTokens({
      userId: userDataDB.id,
      role: userDataDB.role,
    });
  };
}

export { TokenService };
