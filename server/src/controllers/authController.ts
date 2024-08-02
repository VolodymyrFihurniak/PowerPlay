import { JWTOption } from '@elysiajs/jwt';

import { Config } from '@entities/config';

import { AuthContext, CustomJWT } from '@interfaces/authRepository';

import { AuthRepositoryImpl } from '@repositories/authRepositoryImpl';

import { AuthService } from '@services/authService';

class AuthController {
  constructor(readonly config: Config) {}

  public buildAuthService = (jwtAccess: CustomJWT, jwtRefresh?: CustomJWT) => {
    return new AuthService(new AuthRepositoryImpl(this.config, jwtAccess));
  };

  public getVerify = async ({ headers, set, jwtAccess }: AuthContext) => {
    const { authorization } = headers;
    const authService = this.buildAuthService(jwtAccess!);
    const token = authorization?.split(' ')[1];
    if (!token) {
      set.status = 401;
      return JSON.stringify({
        message: 'Unauthorized',
      });
    }
    const result = await authService.verify(token);
    if (!result) {
      set.status = 401;
      return JSON.stringify({
        message: 'Unauthorized',
      });
    }
    return JSON.stringify(result);
  };
}

export { AuthController };
