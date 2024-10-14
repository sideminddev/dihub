import { Test, TestingModule } from '@nestjs/testing';
import { PersistenceModule } from '../../database/persistence/persistence.module';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/application/usecase/create.user.usecase';
import { UpdateUserUseCase } from 'src/application/usecase/update.user.usecase';
import { DeleteUserUseCase } from 'src/application/usecase/delete.user.usecase';
import { ListUserUseCase } from 'src/application/usecase/list.user.usecase';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PersistenceModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        ListUserUseCase,
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  it('Deve existir', () => {
    expect(userController).toBeDefined();
  });
});
