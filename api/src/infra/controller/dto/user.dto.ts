import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do usuário a ser criado',
    example: 'Nome Ilustrativo',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do usuário a ser criado',
    example: 'Nome Ilustrativo',
  })
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do usuário a ser criado',
    example: 'Nome Ilustrativo',
  })
  password: string;
}
