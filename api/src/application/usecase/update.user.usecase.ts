import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from 'src/infra/controller/dto/user.dto';
import { UserRepository } from 'src/infra/repository/user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string, updateUserDTO: UpdateUserDTO) {
    const foundUser = await this.userRepository.findByUsername(username);
    if (!foundUser) throw new Error('Usuário não encontrado');

    return await this.userRepository.update({
      where: {
        id: foundUser.id,
      },
      data: updateUserDTO,
    });
  }
}
