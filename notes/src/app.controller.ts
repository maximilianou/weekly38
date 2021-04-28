import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('/maxjson')
  getMaxJson(): { name: string } {
    return { name: 'Maximiliano Kolbe'};
  }

  @Get('/maxtext')
  @Header('Content-Type','text/html')
  getMaxText(): { name: string } {
    return { name: 'Maximiliano Kolbe'};
  }
}
