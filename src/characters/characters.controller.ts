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
import { CharacterSendDto } from './dto/character.send.dto';
import { FightDto } from './dto/fight.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get('/user/:id')
  @UseGuards(AuthGuard('jwt'))
  async findAllCharacterByUserId(
    @Param('id') id: string,
  ): Promise<CharacterSendDto[]> {
    return await this.charactersService.findAllCharacterByUserId(+id);
  }

  @Get('/fight/:id')
  @UseGuards(AuthGuard('jwt'))
  async simulateFight(@Param('id') id: string): Promise<FightDto> {
    return await this.charactersService.simulateFight(+id);
  }

  //CRUD
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllCharacters(): Promise<CharacterSendDto[]> {
    return await this.charactersService.findAllCharacters();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async findCharacterById(@Param('id') id: string): Promise<Character> {
    return await this.charactersService.findCharacterById(+id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCharacter(
    @Body() character: Partial<Character>,
  ): Promise<CharacterSendDto> {
    return await this.charactersService.createCharacter(character);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async patchCharacter(
    @Body() character: Partial<Character>,
  ): Promise<CharacterSendDto> {
    return await this.charactersService.patchCharacter(character);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCharacter(@Param('id') id: string): Promise<void> {
    return await this.charactersService.deleteCharacter(+id);
  }
}
