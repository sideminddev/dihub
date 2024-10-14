import { Prisma } from '@prisma/client';
import { CreateUserDTO } from 'src/infra/controller/dto/user.dto';
import { UserEntity } from 'src/domain/entity/user.entity';

export class UserMapper {
  static toPrisma(user: UserEntity) {
    return {
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
    } as Prisma.UserCreateInput;
  }

  static toEntity(user: CreateUserDTO) {
    return {
      username: user.username,
      password: user.password,
    } as UserEntity;
  }
}
