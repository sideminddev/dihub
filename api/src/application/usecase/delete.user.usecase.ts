import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/repository/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string) {
    const foundUser = await this.userRepository.findByUsername(username);
    if (!foundUser) throw new Error('Usuário não encontrado!');

    await this.userRepository.delete({
      where: {
        id: foundUser.id,
      },
    });
  }
}
