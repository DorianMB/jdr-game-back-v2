"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROVIDERS = exports.ENTITIES = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../entities/User");
const Character_1 = require("../entities/Character");
const Equipment_1 = require("../entities/Equipment");
const Stat_1 = require("../entities/Stat");
const Bag_1 = require("../entities/Bag");
const LootTable_1 = require("../entities/LootTable");
const Items_1 = require("../entities/Items");
const users_service_1 = require("../users/users.service");
const characters_service_1 = require("../characters/characters.service");
const equipments_service_1 = require("../equipments/equipments.service");
const stats_service_1 = require("../stats/stats.service");
const bag_service_1 = require("../bag/bag.service");
const loot_tables_service_1 = require("../loot-tables/loot-tables.service");
const items_service_1 = require("../items/items.service");
exports.ENTITIES = typeorm_1.TypeOrmModule.forFeature([
    User_1.User,
    Character_1.Character,
    Equipment_1.Equipment,
    Stat_1.Stat,
    Bag_1.Bag,
    LootTable_1.LootTable,
    Items_1.Item,
]);
exports.PROVIDERS = [
    users_service_1.UsersService,
    characters_service_1.CharactersService,
    equipments_service_1.EquipmentsService,
    stats_service_1.StatsService,
    bag_service_1.BagService,
    loot_tables_service_1.LootTablesService,
    items_service_1.ItemsService,
];
//# sourceMappingURL=module.constants.js.map