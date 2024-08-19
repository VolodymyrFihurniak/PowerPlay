import type { UserRole } from '@entities/user';

class UserDTO {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly password: string,
    readonly firstName: string,
    readonly secondName: string,
    readonly nickname: string,
    readonly role: UserRole,
    readonly isActivated: boolean,
    readonly activationLink: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  public static toDTO = (data: JSON.JSONObject) => {
    return new UserDTO(
      data.id,
      data.email,
      data.password,
      data.firstname,
      data.secondname,
      data.nickname,
      data.role,
      data.isActivated,
      data.activationLink,
      data.createdAt,
      data.updatedAt
    );
  };
}

export { UserDTO };
