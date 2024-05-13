import { UsersService } from '../users/users.service';
import { CharactersService } from '../characters/characters.service';
import { EquipmentsService } from '../equipments/equipments.service';
import { StatsService } from '../stats/stats.service';
import { BagService } from '../bag/bag.service';
import { LootTablesService } from '../loot-tables/loot-tables.service';
import { ItemsService } from '../items/items.service';
export declare const ENTITIES: import("@nestjs/common").DynamicModule;
export declare const PROVIDERS: (typeof UsersService | typeof LootTablesService | typeof ItemsService | typeof BagService | typeof EquipmentsService | typeof StatsService | typeof CharactersService)[];
