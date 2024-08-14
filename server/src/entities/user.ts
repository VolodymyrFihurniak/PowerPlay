enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'mod',
  USER = 'user',
}

class User {
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
}

export { User, UserRole };
