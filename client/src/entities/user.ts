enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'mod',
  USER = 'user',
}

class User {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly firstName: string,
    readonly secondName: string,
    readonly nickname: string,
    readonly role: UserRole
  ) {}
}

export { User, UserRole };
