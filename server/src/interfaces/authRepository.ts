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

abstract class AuthRepository {
  abstract login(data: AuthLogin): Promise<string>;
  abstract register(data: AuthRegister): Promise<string>;
  abstract verify(token: string): Promise<string>;
  abstract generateAccessToken(data: AuthLogin | AuthRegister): Promise<string>;
  abstract generateRefreshToken(data: AuthLogin | AuthRegister): Promise<string>;
  abstract refreshToken(token: string): Promise<string>;
  abstract getAccessToken(token: string): Promise<string>;
  abstract getRefreshToken(token: string): Promise<string>;
  abstract deleteAccessToken(token: string): Promise<string>;
  abstract deleteRefreshToken(token: string): Promise<string>;
  abstract forgotPassword(email: string): Promise<string>;
  abstract logout(token: string): Promise<string>;
}

export { AuthLogin, AuthRegister, AuthRepository };
