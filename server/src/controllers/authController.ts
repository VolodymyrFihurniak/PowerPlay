import { Config } from '@entities/config';

import { AuthContext, CustomJWT } from '@interfaces/authRepository';

import { AuthRepositoryImpl } from '@repositories/authRepositoryImpl';

import { AuthService } from '@services/authService';

class AuthController {
  constructor(readonly config: Config) {}

  public buildAuthService = (jwt: CustomJWT) => {
    return new AuthService(new AuthRepositoryImpl(this.config, jwt));
  };

  public getVerify = async ({ headers, set, jwt }: AuthContext) => {
    const { authorization } = headers;
    const authService = this.buildAuthService(jwt);
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
