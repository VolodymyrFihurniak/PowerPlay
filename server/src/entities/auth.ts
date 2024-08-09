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
    readonly lastName: string,
    readonly nickname: string,
    readonly email: string,
    readonly password: string,
    readonly activationLink: string
  ) {}
}

export { AuthLogin, AuthRegister };
