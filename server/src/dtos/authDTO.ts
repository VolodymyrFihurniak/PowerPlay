class AuthLoginDTO {
  constructor(
    readonly email: string,
    readonly nickname: string,
    readonly password: string
  ) {}

  public static fromRequest(body: {
    email: string;
    nickname: string;
    password: string;
  }): AuthLoginDTO {
    return new AuthLoginDTO(body.email, body.nickname, body.password);
  }
}

class AuthRegisterDTO {
  constructor(
    readonly firstName: string,
    readonly secondName: string,
    readonly nickname: string,
    readonly email: string,
    readonly password: string,
    readonly activationLink?: string
  ) {}

  public static fromRequest(body: {
    firstName: string;
    secondName: string;
    nickname: string;
    email: string;
    password: string;
  }): AuthRegisterDTO {
    return new AuthRegisterDTO(
      body.firstName,
      body.secondName,
      body.nickname,
      body.email,
      body.password
    );
  }
}

class AuthTokenDTO {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string
  ) {}

  public static fromObject(obj: {
    accessToken: string;
    refreshToken: string;
  }): AuthTokenDTO {
    return new AuthTokenDTO(obj.accessToken, obj.refreshToken);
  }
}

export { AuthLoginDTO, AuthRegisterDTO, AuthTokenDTO };
