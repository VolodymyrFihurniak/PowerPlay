import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { AuthRegister } from '@entities/auth';

import { UserRepository } from '@interfaces/userRepository';

import { MailService } from './mailService';

class UserService {
  constructor(
    readonly userDB: UserRepository,
    readonly mailService: MailService
  ) {}
  public registration = async (data: AuthRegister) => {
    const candidate = await this.userDB.getUserByEmail(data.email);
    if (candidate) {
      throw new Error('User with this email already exists');
    }
    const hashPassword = await bcrypt.hash(data.password, 5);
    const activateLink = uuidv4();
    const user = await this.userDB.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      nickname: data.nickname,
      email: data.email,
      password: hashPassword,
      activationLink: activateLink,
    });
    await this.mailService.sendActivationMail(data.email, activateLink);
  };
}

export { UserService };
