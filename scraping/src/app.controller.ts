import { Controller, Get } from "@nestjs/common";
import { ScrapingService } from "./scraping.service";

@Controller()
export class AppController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Get("most-expensive")
  async getMostExpensiveProduct() {
    return this.scrapingService.scrape();
  }
}
