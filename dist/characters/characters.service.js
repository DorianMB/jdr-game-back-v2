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
exports.CharactersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Character_1 = require("../entities/Character");
const typeorm_2 = require("typeorm");
const bag_service_1 = require("../bag/bag.service");
const equipments_service_1 = require("../equipments/equipments.service");
const loot_tables_service_1 = require("../loot-tables/loot-tables.service");
const stats_service_1 = require("../stats/stats.service");
const functions_1 = require("../utils/functions");
const fight_dto_1 = require("./dto/fight.dto");
const items_service_1 = require("../items/items.service");
let CharactersService = class CharactersService {
    constructor(charactersRepository, bagService, equipmentsService, statsService, lootTablesService, itemsService) {
        this.charactersRepository = charactersRepository;
        this.bagService = bagService;
        this.equipmentsService = equipmentsService;
        this.statsService = statsService;
        this.lootTablesService = lootTablesService;
        this.itemsService = itemsService;
    }
    async findAllCharacters() {
        const characters = await this.charactersRepository.find({
            relations: ['user_id', 'equipment_id', 'stat_id', 'bag_id'],
        });
        return characters.map((character) => {
            return {
                ...character,
                user_id: character.user_id?.user_id
                    ? character.user_id?.user_id
                    : character.user_id,
                equipment_id: character.equipment_id?.equipment_id,
                stat_id: character.stat_id?.stat_id,
                bag_id: character.bag_id?.bag_id,
            };
        });
    }
    async findAllCharacterByUserId(user_id) {
        return await this.charactersRepository.find({
            where: { user_id: user_id },
            relations: ['user_id', 'equipment_id', 'stat_id', 'bag_id'],
        });
    }
    async findCharacterById(id) {
        const character = await this.charactersRepository.findOne({
            where: { character_id: id },
            relations: ['user_id', 'equipment_id', 'stat_id', 'bag_id'],
        });
        const equipment = await this.equipmentsService.findOneCascade(character.equipment_id.equipment_id);
        character.equipment_id = equipment;
        return character;
    }
    async createCharacter(character) {
        character = (0, functions_1.convertEmptyStringToNull)(character);
        character.money = character.money || 0;
        character.experience = character.experience || 0;
        character.level =
            character.level || (0, functions_1.getLevelByExperience)(character.experience);
        character.bag_id = await this.bagService.create({ size: 5 });
        character.equipment_id = await this.equipmentsService.create({});
        character.stat_id = await this.statsService.create({
            strength: 10,
            intelligence: 10,
            speed: 10,
            charisma: 10,
            health: 10,
            luck: 10,
        });
        character.created_at = new Date();
        character.updated_at = new Date();
        const newCharacter = await this.charactersRepository.save(character);
        return {
            ...newCharacter,
        };
    }
    async patchCharacter(character) {
        character = (0, functions_1.convertEmptyStringToNull)(character);
        character.updated_at = new Date();
        character.level = (0, functions_1.getLevelByExperience)(character.experience);
        const updatedCharacter = await this.charactersRepository.save(character);
        return {
            ...updatedCharacter,
            user_id: character.user_id?.user_id
                ? character.user_id?.user_id
                : character.user_id,
            equipment_id: updatedCharacter.equipment_id?.equipment_id,
            stat_id: updatedCharacter.stat_id?.stat_id,
            bag_id: updatedCharacter.bag_id?.bag_id,
        };
    }
    async deleteCharacter(id) {
        const character = await this.findCharacterById(id);
        await this.charactersRepository.delete(id);
        await this.bagService.remove(character.bag_id.bag_id);
        await this.equipmentsService.remove(character.equipment_id.equipment_id);
        await this.statsService.remove(character.stat_id.stat_id);
    }
    async simulateFight(id) {
        const character = await this.findCharacterById(id);
        const newFight = new fight_dto_1.FightDto();
        newFight.enemy = (0, functions_1.randomEnemy)(character);
        newFight.rounds = (0, functions_1.simulateRounds)(character, newFight.enemy);
        newFight.isVictory = (0, functions_1.isVictory)(newFight.rounds);
        if (newFight.isVictory) {
            character.experience += newFight.enemy.level * 10;
            const newLevel = (0, functions_1.getLevelByExperience)(character.experience);
            if (newLevel > character.level) {
                character.experience_points = newLevel - character.level;
                character.level = newLevel;
            }
            const allLootTables = await this.lootTablesService.findAll();
            const treasure = await this.itemsService.generateItemFromLootTable(allLootTables[Math.floor(Math.random() * allLootTables.length)]
                .loot_table_id, newFight.enemy.level);
            const newUpdateItem = { ...treasure };
            newUpdateItem.created_at = treasure.created_at;
            newUpdateItem.bag_id = character.bag_id.bag_id;
            newUpdateItem.loot_id = treasure.loot_id
                .loot_table_id;
            newUpdateItem.owned = true;
            const treasureUpdated = await this.itemsService.update(newUpdateItem);
            treasureUpdated.loot_id = treasure.loot_id;
            newFight.treasure = treasureUpdated;
            await this.patchCharacter(character);
        }
        return newFight;
    }
};
exports.CharactersService = CharactersService;
exports.CharactersService = CharactersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Character_1.Character)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bag_service_1.BagService,
        equipments_service_1.EquipmentsService,
        stats_service_1.StatsService,
        loot_tables_service_1.LootTablesService,
        items_service_1.ItemsService])
], CharactersService);
//# sourceMappingURL=characters.service.js.map