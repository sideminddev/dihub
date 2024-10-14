import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/repository/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { CreateUserDTO } from 'src/infra/controller/dto/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserDTO: CreateUserDTO): Promise<User> {
    const foundUser = await this.userRepository.findByUsername(
      createUserDTO.username,
    );
    if (foundUser)
      throw new Error('Já existe um usuário com o username informado.');
    const user = UserMapper.toEntity(createUserDTO);
    return await this.userRepository.save({ data: user });
  }
}
