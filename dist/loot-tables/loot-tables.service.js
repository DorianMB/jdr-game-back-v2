"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LootTablesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const LootTable_1 = require("../entities/LootTable");
const typeorm_2 = require("typeorm");
const constants_1 = require("../utils/constants");
const functions_1 = require("../utils/functions");
let LootTablesService = class LootTablesService {
    constructor(lootTableRepository) {
        this.lootTableRepository = lootTableRepository;
    }
    async create(createLootTableDto) {
        createLootTableDto = (0, functions_1.convertEmptyStringToNull)(createLootTableDto);
        createLootTableDto.created_at = new Date();
        createLootTableDto.updated_at = new Date();
        return await this.lootTableRepository.save(createLootTableDto);
    }
    async findAll() {
        return await this.lootTableRepository.find();
    }
    async findOne(id) {
        return await this.lootTableRepository.findOne({
            where: {
                loot_table_id: id,
            },
        });
    }
    async update(updateLootTableDto) {
        updateLootTableDto = (0, functions_1.convertEmptyStringToNull)(updateLootTableDto);
        updateLootTableDto.updated_at = new Date();
        return await this.lootTableRepository.save(updateLootTableDto);
    }
    async remove(id) {
        await this.lootTableRepository.delete(id);
    }
    async getRandomLootTable() {
        const lootTable = new LootTable_1.LootTable();
        const url = constants_1.LOOT_BASE_PICTURE;
        const lootType = constants_1.LOOT_TYPE_LIST[Math.floor(Math.random() * constants_1.LOOT_TYPE_LIST.length)];
        const rarity = constants_1.RARITY_LIST[Math.floor(Math.random() * constants_1.RARITY_LIST.length)];
        lootTable.name = lootType + ' du random';
        lootTable.description = 'Description du ' + lootType + ' random';
        lootTable.picture = url;
        if (constants_1.PRIMARY_WEAPON_TYPE_LIST.includes(lootType)) {
            lootTable.fight_picture = url;
        }
        lootTable.type = lootType;
        lootTable.rarity = rarity;
        if (constants_1.ARMOR_TYPE_LIST.includes(lootType)) {
            constants_1.LOOT_STATS_TYPE_LIST.forEach((stat) => {
                const res = (0, functions_1.lootTableStatMinMax)();
                lootTable[stat + '_min'] = res[0];
                lootTable[stat + '_max'] = res[1];
            });
        }
        else {
            constants_1.STATS_TYPE_LIST.forEach((stat) => {
                const res = (0, functions_1.lootTableStatMinMax)();
                lootTable[stat + '_min'] = res[0];
                lootTable[stat + '_max'] = res[1];
            });
        }
        lootTable.charm = Math.random() > 0.5;
        if (lootTable.charm) {
            lootTable.charm_type =
                constants_1.CHARM_TYPE_LIST[Math.floor(Math.random() * constants_1.CHARM_TYPE_LIST.length)];
            lootTable.charm_value = Math.floor(Math.random() * 100);
        }
        lootTable.created_at = new Date();
        lootTable.updated_at = new Date();
        return await this.lootTableRepository.save(lootTable);
    }
};
exports.LootTablesService = LootTablesService;
exports.LootTablesService = LootTablesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(LootTable_1.LootTable)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LootTablesService);
//# sourceMappingURL=loot-tables.service.js.map