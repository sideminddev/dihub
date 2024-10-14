import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { CreateUserUseCase } from 'src/application/usecase/create.user.usecase';
import { ListUserUseCase } from 'src/application/usecase/list.user.usecase';
import { UpdateUserUseCase } from 'src/application/usecase/update.user.usecase';
import { DeleteUserUseCase } from 'src/application/usecase/delete.user.usecase';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private listUserUseCase: ListUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Endpoint para criar um usuário.' })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado',
  })
  @ApiBody({ type: CreateUserDTO, required: true })
  async createUser(@Res() res: Response, @Body() body: CreateUserDTO) {
    try {
      const result = await this.createUserUseCase.execute(body);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({
        message:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao atualizar as informações do usuário.',
        error,
      });
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Endpoint para listagem de usuários.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários',
  })
  async getUser(@Res() res: Response) {
    try {
      const result = await this.listUserUseCase.execute();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({
        message: 'Ocorreu um erro na listagem de usuários',
        error,
      });
    }
  }

  @Put(':username')
  @ApiOperation({ summary: 'Endpoint para atualizar um usuário.' })
  @ApiBody({ type: UpdateUserDTO, required: true })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
  })
  async updateUser(
    @Res() res: Response,
    @Param('username') username: string,
    @Body() body: UpdateUserDTO,
  ) {
    try {
      const result = await this.updateUserUseCase.execute(username, body);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({
        message:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao atualizar as informações do usuário.',
        error,
      });
    }
  }

  @Delete(':username')
  @ApiOperation({ summary: 'Endpoint para remover um usuário.' })
  @ApiResponse({
    status: 200,
  })
  async deleteUser(@Res() res: Response, @Param('username') username: string) {
    try {
      await this.deleteUserUseCase.execute(username);
      res.status(200).send();
    } catch (error) {
      res.status(500).send({
        message:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao atualizar as informações do usuário.',
        error,
      });
    }
  }
}
