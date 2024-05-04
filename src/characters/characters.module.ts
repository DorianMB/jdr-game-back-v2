import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { ENTITIES, PROVIDERS } from '../utils/module.constants';

@Module({
  imports: [ENTITIES],
  controllers: [CharactersController],
  providers: [...PROVIDERS],
  exports: [CharactersService],
})
export class CharactersModule {}
