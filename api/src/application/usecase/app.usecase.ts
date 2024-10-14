import { Injectable } from '@nestjs/common';

@Injectable()
export class AppUsecase {
  async getHello(): Promise<{ message: string }> {
    return { message: 'Hello World' };
  }
}
