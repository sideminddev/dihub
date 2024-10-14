import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/repository/user.repository';

@Injectable()
export class ListUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.listAll({});
  }
}
