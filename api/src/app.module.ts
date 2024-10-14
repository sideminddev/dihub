import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchemaForEnv } from './database/config/environment-variables';
import { PersistenceModule } from './database/persistence/persistence.module';
import { AppUsecase } from './application/usecase/app.usecase';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserController } from './infra/controller/user.controller';
import { UserRepository } from './infra/repository/user.repository';
import { CreateUserUseCase } from './application/usecase/create.user.usecase';
import { UpdateUserUseCase } from './application/usecase/update.user.usecase';
import { ListUserUseCase } from './application/usecase/list.user.usecase';
import { DeleteUserUseCase } from './application/usecase/delete.user.usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
    }),
    PersistenceModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [
    AppUsecase,
    UserRepository,
    CreateUserUseCase,
    UpdateUserUseCase,
    ListUserUseCase,
    DeleteUserUseCase,
  ],
})
export class AppModule {}
