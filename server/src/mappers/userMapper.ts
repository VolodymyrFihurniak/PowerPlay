import { UserDTO } from '@dtos/userDTO';

import { User } from '@entities/user';

import { DataMapper } from '.';

class UserMapper implements DataMapper<UserDTO, User> {
  toEntity(dto: UserDTO): User {
    return new User(
      dto.id,
      dto.email,
      dto.password,
      dto.firstName,
      dto.secondName,
      dto.nickname,
      dto.role,
      dto.isActivated,
      dto.activationLink,
      dto.createdAt,
      dto.updatedAt
    );
  }
}

export { UserMapper };
