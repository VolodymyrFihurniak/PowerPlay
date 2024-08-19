import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import type { UserDTO } from '@src/dtos/userDTO';
import { UserMapper } from '@src/mappers/userMapper';

import type { AuthRegister } from '@entities/auth';
import type { User } from '@entities/user';

import { ApiError } from '@errors/apiError';

import type { UserRepository } from '@interfaces/userRepository';

import type { MailService } from './mailService';
import type { TokenService } from './tokenService';

class UserService {
  constructor(
    readonly userDB: UserRepository,
    readonly mailService: MailService,
    readonly tokenService: TokenService
  ) {}

  public registration = async (
    data: AuthRegister,
    url: string
  ): Promise<Record<string, string | User>> => {
    let candidate = await this.userDB.getUserByEmail(data.email);
    if (candidate) {
      throw ApiError.BadRequest('User with this email already exists');
    }
    candidate = await this.userDB.getUserByNickname(data.nickname);
    if (candidate) {
      throw ApiError.BadRequest('User with this nickname already exists');
    }
    const hashPassword = await bcrypt.hash(data.password, 5);
    const activateLink = uuidv4();
    const userDTO: UserDTO = await this.userDB.createUser({
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
    return await this.createAndStoreTokens(userDTO);
  };

  public login = async (
    email: string,
    password: string
  ): Promise<Record<string, string | User>> => {
    const candidate = await this.userDB.getUserByEmail(email);
    if (!candidate) {
      throw ApiError.BadRequest('User with this email not found');
    }
    if (!candidate.isActivated) {
      throw ApiError.Unauthorized('User not activated');
    }
    const comparePassword = await bcrypt.compare(password, candidate.password);
    if (!comparePassword) {
      throw ApiError.Unauthorized('Incorrect password');
    }
    return await this.createAndStoreTokens(candidate);
  };

  public createAndStoreTokens = async (
    candidate: UserDTO
  ): Promise<Record<string, string | User>> => {
    const tokens = await this.tokenService.generateTokens({
      userId: candidate.id,
      role: candidate.role,
    });
    await this.tokenService.saveToken(candidate.id, tokens.refreshToken);
    return { ...tokens, user: new UserMapper().toEntity(candidate) };
  };

  public logout = async (refreshToken: string) => {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  };

  public refresh = async (refreshToken: string) => {
    const userData = await this.tokenService.jwtRefresh.verify(refreshToken);
    if (!userData || typeof userData === 'boolean') {
      const refreshTokenDB = await this.tokenService.db.getRefreshTokenId(refreshToken);
      if (refreshTokenDB) {
        await this.tokenService.removeToken(refreshToken);
      }
      throw ApiError.Unauthorized('Invalid refresh token');
    }
    const userDataDB = await this.userDB.getUserById(Number(userData.userId));
    if (!userDataDB) {
      throw ApiError.Unauthorized('Invalid refresh token in DB');
    }

    const accessToken = await this.tokenService.generateAccessToken({
      userId: userDataDB.id,
      role: userDataDB.role,
    });

    return { accessToken, user: new UserMapper().toEntity(userDataDB) };
  };
}

export { UserService };
