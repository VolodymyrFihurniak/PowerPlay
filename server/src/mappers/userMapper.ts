import type { UserDTO } from '@dtos/userDTO';

import { User } from '@entities/user';

import type { DataMapper } from '.';

class UserMapper implements DataMapper<UserDTO, User> {
  toEntity(dto: UserDTO): User {
    return new User(
      dto.id,
      dto.email,
      dto.firstName,
      dto.secondName,
      dto.nickname,
      dto.role
    );
  }
}

export { UserMapper };
