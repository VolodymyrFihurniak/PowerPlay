import { PaymentDTO } from './paymentDTO';
import { ReservationDTO } from './reservationDTO';
import { SessionDTO } from './sessionDTO';

enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'mod',
  USER = 'user',
}

class UserDTO {
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
    readonly reservations?: ReservationDTO,
    readonly sessions?: SessionDTO,
    readonly payments?: PaymentDTO
  ) {}
}

export { UserDTO, UserRole };
