import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '../entities/Character';
import { EquipmentsService } from '../equipments/equipments.service';
import { StatsService } from '../stats/stats.service';
import { BagService } from '../bag/bag.service';
import { Equipment } from '../entities/Equipment';
import { Stat } from '../entities/Stat';
import { Bag } from '../entities/Bag';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Equipment, Stat, Bag])],
  controllers: [CharactersController],
  providers: [CharactersService, EquipmentsService, StatsService, BagService],
})
export class CharactersModule {}
