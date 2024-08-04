import { JWTOption, JWTPayloadSpec } from '@elysiajs/jwt';
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

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

interface AuthContext extends Context {
  jwtAccess?: CustomJWT;
  jwtRefresh?: CustomJWT;
}

interface CustomJWT extends JWTOption {
  readonly sign: (
    morePayload: Record<string, string | number> & JWTPayloadSpec
  ) => Promise<string>;
  readonly verify: (
    jwt?: string
  ) => Promise<false | (Record<string, string | number> & JWTPayloadSpec)>;
}

abstract class AuthRepository {
  //   TODO: abstract login(data: AuthLogin): Promise<string>;
  //   TODO: abstract register(data: AuthRegister): Promise<string>;
  abstract generateAccessToken(refreshToken: string): Promise<JSON.JSONObject>;
  //   TODO: abstract generateRefreshToken(data: AuthLogin | AuthRegister): Promise<string>;
  //   TODO: abstract refreshToken(payload: string): Promise<string>;
  //   TODO: abstract getAccessToken(payload: string): Promise<string>;
  //   TODO: abstract getRefreshToken(payload: string): Promise<string>;
  //   TODO: abstract deleteAccessToken(payload: string): Promise<string>;
  //   TODO: abstract deleteRefreshToken(payload: string): Promise<string>;
  //   TODO: abstract forgotPassword(email: AuthLogin): Promise<string>;
  //   TODO: abstract logout(payload: string): Promise<string>;
}

export { AuthLogin, AuthRegister, AuthRepository, AuthContext, CustomJWT, AuthToken };
