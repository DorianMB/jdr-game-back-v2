import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { AuthGuard } from '@nestjs/passport';
import { Character } from '../entities/Character';
import { CharaterSendDto } from './dto/charater.send.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllCharacters(): Promise<CharaterSendDto[]> {
    return await this.charactersService.findAllCharacters();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCharacter(
    @Body() character: Partial<Character>,
  ): Promise<CharaterSendDto> {
    return await this.charactersService.createCharacter(character);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async patchCharacter(
    @Body() character: Partial<Character>,
  ): Promise<CharaterSendDto> {
    return await this.charactersService.patchCharacter(character);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCharacter(@Param('id') id: string): Promise<void> {
    console.log('id1', id);
    return await this.charactersService.deleteCharacter(+id);
  }
}
