import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Character } from '../entities/Character';
import { Equipment } from '../entities/Equipment';
import { Stat } from '../entities/Stat';
import { Bag } from '../entities/Bag';
import { LootTable } from '../entities/LootTable';
import { Item } from '../entities/Items';
import { UsersService } from '../users/users.service';
import { CharactersService } from '../characters/characters.service';
import { EquipmentsService } from '../equipments/equipments.service';
import { StatsService } from '../stats/stats.service';
import { BagService } from '../bag/bag.service';
import { LootTablesService } from '../loot-tables/loot-tables.service';
import { ItemsService } from '../items/items.service';

export const ENTITIES = TypeOrmModule.forFeature([
  User,
  Character,
  Equipment,
  Stat,
  Bag,
  LootTable,
  Item,
]);

export const PROVIDERS = [
  UsersService,
  CharactersService,
  EquipmentsService,
  StatsService,
  BagService,
  LootTablesService,
  ItemsService,
];
