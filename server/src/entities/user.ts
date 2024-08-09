import { Payment } from './payment';
import { Reservation } from './reservation';
import { Session } from './session';

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
    readonly lastName: string,
    readonly nickname: string,
    readonly role: UserRole,
    readonly isActivated: boolean,
    readonly activationLink: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly refreshToken: string,
    readonly reservations?: Reservation,
    readonly sessions?: Session,
    readonly payments?: Payment
  ) {}
}

export { User, UserRole };
