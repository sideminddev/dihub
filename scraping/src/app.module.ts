import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScrapingService } from './scraping.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ScrapingService],
})
export class AppModule {}
