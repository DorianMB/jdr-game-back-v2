import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/User';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test')
  async postTest(@Body() user: User): Promise<string> {
    return await this.appService.postTest(user);
  }
}
