import { JWTOption } from '@elysiajs/jwt';
import { Context } from 'elysia';

interface AuthLogin {
  email?: string;
  nickname?: string;
  password: string;
}

interface AuthRegister {
  email: string;
  password: string;
  firstname: string;
  secondname: string;
  nickname: string;
}

interface AuthContext extends Context {
  jwtAccess?: CustomJWT;
  jwtRefresh?: CustomJWT;
}

interface CustomJWT extends JWTOption {
  verify: (token: string) => Promise<JSON.JSONObject | boolean>;
  sign: (payload: JSON.JSONObject) => Promise<string>;
}

abstract class AuthRepository {
  //   TODO: abstract login(data: AuthLogin): Promise<string>;
  //   TODO: abstract register(data: AuthRegister): Promise<string>;
  abstract verify(token: string): Promise<JSON.JSONObject | boolean>;
  //   TODO: abstract generateAccessToken(data: AuthLogin | AuthRegister): Promise<string>;
  //   TODO: abstract generateRefreshToken(data: AuthLogin | AuthRegister): Promise<string>;
  //   TODO: abstract refreshToken(payload: string): Promise<string>;
  //   TODO: abstract getAccessToken(payload: string): Promise<string>;
  //   TODO: abstract getRefreshToken(payload: string): Promise<string>;
  //   TODO: abstract deleteAccessToken(payload: string): Promise<string>;
  //   TODO: abstract deleteRefreshToken(payload: string): Promise<string>;
  //   TODO: abstract forgotPassword(email: AuthLogin): Promise<string>;
  //   TODO: abstract logout(payload: string): Promise<string>;
}

export { AuthLogin, AuthRegister, AuthRepository, AuthContext, CustomJWT };
