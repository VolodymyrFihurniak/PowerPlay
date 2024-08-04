import { Config } from '@entities/config';

import {
  AuthContext,
  AuthLogin,
  AuthRegister,
  AuthToken,
  CustomJWT,
} from '@interfaces/authRepository';

import { AuthRepositoryImpl } from '@repositories/authRepositoryImpl';

import { AuthService } from '@services/authService';

class AuthController {
  constructor(readonly config: Config) {}

  public buildAuthService = async (
    jwtAccess?: CustomJWT,
    jwtRefresh?: CustomJWT
  ): Promise<AuthService> => {
    return new AuthService(new AuthRepositoryImpl(this.config, jwtAccess, jwtRefresh));
  };

  public generateAccessToken = async ({
    jwtAccess,
    jwtRefresh,
    headers,
  }: AuthContext): Promise<string> => {
    let { refresh_token: refreshToken } = headers;
    refreshToken = refreshToken!.split(' ')[1];
    const authServices = await this.buildAuthService(jwtAccess, jwtRefresh);
    const result = await authServices.generateAccessToken(refreshToken);
    return result;
  };
}

export { AuthController };
