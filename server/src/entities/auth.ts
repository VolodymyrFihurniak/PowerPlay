import { UserRole } from './user';

class AuthLogin {
  constructor(
    readonly email: string,
    readonly nickname: string,
    readonly password: string
  ) {}
}

class AuthRegister {
  constructor(
    readonly firstName: string,
    readonly secondName: string,
    readonly nickname: string,
    readonly email: string,
    readonly password: string,
    readonly activationLink?: string
  ) {}
}

class AuthPayload {
  constructor(
    readonly userId: number,
    readonly role: UserRole
  ) {}
}

export { AuthLogin, AuthRegister, AuthPayload };
