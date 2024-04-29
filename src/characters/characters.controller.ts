import { Controller, Get, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllCharacters(): Promise<object[]> {
    return await this.charactersService.findAllCharacters();
  }
}
