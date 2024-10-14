import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/persistence/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(data: Prisma.UserCreateArgs): Promise<User> {
    return await this.prismaService.user.create(data);
  }

  async update(params: Prisma.UserUpdateArgs): Promise<User | undefined> {
    return await this.prismaService.user.update(params);
  }

  async delete(params: Prisma.UserDeleteArgs): Promise<void> {
    await this.prismaService.user.delete(params);
  }

  async listAll(params: Prisma.UserFindManyArgs): Promise<User[] | []> {
    return await this.prismaService.user.findMany(params);
  }

  async findById(id: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }
}
