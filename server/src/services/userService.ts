import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { UserDTO } from '@src/dtos/userDTO';
import { UserMapper } from '@src/mappers/userMapper';

import { AuthRegister } from '@entities/auth';

import { UserRepository } from '@interfaces/userRepository';

import { MailService } from './mailService';
import { TokenService } from './tokenService';

class UserService {
  constructor(
    readonly userDB: UserRepository,
    readonly mailService: MailService,
    readonly tokenService: TokenService
  ) {}

  public registration = async (
    data: AuthRegister,
    url: string
  ): Promise<Record<string, string | UserDTO>> => {
    let candidate = await this.userDB.getUserByEmail(data.email);
    if (candidate) {
      throw new Error('User with this email already exists');
    }
    candidate = await this.userDB.getUserByNickname(data.nickname);
    if (candidate) {
      throw new Error('User with this nickname already exists');
    }
    const hashPassword = await bcrypt.hash(data.password, 5);
    const activateLink = uuidv4();
    const userDTO = await this.userDB.createUser({
      firstName: data.firstName,
      secondName: data.secondName,
      nickname: data.nickname,
      email: data.email,
      password: hashPassword,
      activationLink: activateLink,
    });
    await this.mailService.sendActivationMail(
      data.email,
      `${url}/auth/activate/${activateLink}`
    );
    const tokens = await this.tokenService.generateTokens({
      userId: userDTO.id,
      role: userDTO.role,
    });
    await this.tokenService.saveToken(userDTO.id, tokens.refreshToken);
    return { ...tokens, user: new UserMapper().toEntity(userDTO) };
  };
}

export { UserService };
