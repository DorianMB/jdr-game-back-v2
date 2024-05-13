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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Items_1 = require("../entities/Items");
const typeorm_2 = require("typeorm");
const functions_1 = require("../utils/functions");
const loot_tables_service_1 = require("../loot-tables/loot-tables.service");
const constants_1 = require("../utils/constants");
const Bag_1 = require("../entities/Bag");
const Equipment_1 = require("../entities/Equipment");
const Character_1 = require("../entities/Character");
let ItemsService = class ItemsService {
    constructor(itemRepository, bagRepository, equipmentRepository, characterRepository, lootTablesService) {
        this.itemRepository = itemRepository;
        this.bagRepository = bagRepository;
        this.equipmentRepository = equipmentRepository;
        this.characterRepository = characterRepository;
        this.lootTablesService = lootTablesService;
    }
    async create(createItemDto) {
        createItemDto = (0, functions_1.convertEmptyStringToNull)(createItemDto);
        createItemDto.created_at = new Date();
        createItemDto.updated_at = new Date();
        return await this.itemRepository.save(createItemDto);
    }
    async findAll(where) {
        const items = await this.itemRepository.find({
            where: where ? where : '',
            relations: ['bag_id', 'loot_id'],
        });
        return items.map((item) => {
            return {
                ...item,
                bag_id: item.bag_id?.bag_id ? item.bag_id?.bag_id : item.bag_id,
                loot_id: item.loot_id?.loot_table_id
                    ? item.loot_id?.loot_table_id
                    : item.loot_id,
            };
        });
    }
    async findAllCascade(where) {
        return await this.itemRepository.find({
            where: where ? where : '',
            relations: ['loot_id'],
        });
    }
    async findOne(id) {
        return await this.itemRepository.findOne({
            relations: ['bag_id', 'loot_id'],
            where: {
                item_id: id,
            },
        });
    }
    async update(updateItemDto) {
        updateItemDto = (0, functions_1.convertEmptyStringToNull)(updateItemDto);
        if (typeof updateItemDto.created_at === 'object') {
            updateItemDto.created_at = new Date();
        }
        updateItemDto.updated_at = new Date();
        return await this.itemRepository.save(updateItemDto);
    }
    async remove(id) {
        await this.itemRepository.delete(id);
    }
    async generateItemFromLootTable(lootTableId, level) {
        const lootTable = await this.lootTablesService.findOne(lootTableId);
        if (!lootTable) {
            throw new common_1.NotFoundException('Loot table not found');
        }
        if (level === null) {
            level = Math.floor(Math.random() * 100);
        }
        let newItem = new Items_1.Item();
        newItem.loot_id = lootTable;
        newItem.bag_id = null;
        newItem.level = level;
        newItem.rarity = (0, functions_1.randomRarity)(lootTable.rarity);
        newItem.price =
            Math.floor(Math.random() * constants_1.BASE_PRICE_BY_RARIY[newItem.rarity]) *
                (level / 4);
        if (newItem.price <= 0) {
            newItem.price = 1;
        }
        newItem.strength =
            (0, functions_1.randomBetween)(lootTable.strength_min, lootTable.strength_max) *
                (level / 4);
        newItem.intelligence =
            (0, functions_1.randomBetween)(lootTable.intelligence_min, lootTable.intelligence_max) *
                level;
        newItem.speed =
            (0, functions_1.randomBetween)(lootTable.speed_min, lootTable.speed_max) * (level / 4);
        newItem.charisma =
            (0, functions_1.randomBetween)(lootTable.charisma_min, lootTable.charisma_max) *
                (level / 4);
        newItem.health =
            (0, functions_1.randomBetween)(lootTable.health_min, lootTable.health_max) * (level / 4);
        newItem.luck =
            (0, functions_1.randomBetween)(lootTable.luck_min, lootTable.luck_max) * (level / 4);
        newItem.charm = lootTable.charm ? true : Math.random() > 0.5;
        if (newItem.charm) {
            newItem.charm_type = lootTable.charm_type
                ? lootTable.charm_type
                : constants_1.CHARM_TYPE_LIST[Math.floor(Math.random() * constants_1.CHARM_TYPE_LIST.length)];
            newItem.charm_value = lootTable.charm_value
                ? lootTable.charm_value
                : Math.floor(Math.random() * level);
        }
        newItem.created_at = new Date();
        newItem.updated_at = new Date();
        newItem = await this.itemRepository.save(newItem);
        newItem.loot_id = lootTable;
        return newItem;
    }
    async equipItem(info) {
        const item = await this.itemRepository.findOne({
            relations: ['loot_id', 'bag_id'],
            where: {
                item_id: info.item_id,
            },
        });
        const equipment = await this.equipmentRepository.findOne({
            relations: [
                'helmet_id',
                'chestplate_id',
                'gloves_id',
                'boots_id',
                'primary_weapon_id',
                'secondary_weapon_id',
                'primary_magic_item_id',
                'secondary_magic_item_id',
            ],
            where: {
                equipment_id: info.equipment_id,
            },
        });
        const bag = await this.bagRepository.findOne({
            where: {
                bag_id: info.bag_id,
            },
        });
        if (!item || !equipment || !bag) {
            throw new common_1.NotFoundException('Item, equipment or bag not found');
        }
        if (item.bag_id.bag_id !== bag.bag_id) {
            throw new common_1.NotFoundException('Item is not in the bag');
        }
        item.bag_id = null;
        const typeOfItem = item.loot_id.type;
        let itemToUnequip = null;
        if (constants_1.PRIMARY_WEAPON_TYPE_LIST.includes(typeOfItem)) {
            itemToUnequip = equipment.primary_weapon_id;
            equipment.primary_weapon_id = item;
        }
        else if (constants_1.SECONDARY_WEAPON_TYPE_LIST.includes(typeOfItem)) {
            itemToUnequip = equipment.secondary_weapon_id;
            equipment.secondary_weapon_id = item;
        }
        else if (typeOfItem === 'magic_item') {
            if (!equipment.primary_magic_item_id) {
                equipment.primary_magic_item_id = item;
            }
            else if (!equipment.secondary_magic_item_id) {
                equipment.secondary_magic_item_id = item;
            }
            else {
                itemToUnequip = equipment.primary_magic_item_id;
                equipment.primary_magic_item_id = item;
            }
        }
        else {
            itemToUnequip = equipment[typeOfItem + '_id'];
            equipment[typeOfItem + '_id'] = item;
        }
        if (itemToUnequip) {
            const itemToUnequipData = await this.itemRepository.findOne({
                where: {
                    item_id: itemToUnequip.item_id,
                },
            });
            itemToUnequipData.bag_id = bag;
            await this.itemRepository.save(itemToUnequipData);
        }
        await this.itemRepository.save(item);
        await this.equipmentRepository.save(equipment);
        return true;
    }
    async putInBag(info) {
        const item = await this.itemRepository.findOne({
            relations: ['loot_id'],
            where: {
                item_id: info.item_id,
            },
        });
        const bag = await this.bagRepository.findOne({
            where: {
                bag_id: info.bag_id,
            },
        });
        const ItemsInBag = await this.itemRepository.find({
            where: {
                bag_id: bag.bag_id,
            },
        });
        const equipment = await this.equipmentRepository.findOne({
            relations: [
                'helmet_id',
                'chestplate_id',
                'gloves_id',
                'boots_id',
                'primary_weapon_id',
                'secondary_weapon_id',
                'primary_magic_item_id',
                'secondary_magic_item_id',
            ],
            where: {
                equipment_id: info.equipment_id,
            },
        });
        if (!item || !bag || !equipment) {
            throw new common_1.NotFoundException('Item, bag or equipment not found');
        }
        if (ItemsInBag && ItemsInBag.length >= bag.size) {
            throw new common_1.NotFoundException('Bag is full');
        }
        if (item.bag_id) {
            throw new common_1.NotFoundException('Item is already in a bag');
        }
        item.bag_id = bag;
        Object.keys(equipment).forEach((key) => {
            if (equipment[key] && equipment[key].item_id === item.item_id) {
                equipment[key] = null;
            }
        });
        await this.itemRepository.save(item);
        await this.equipmentRepository.save(equipment);
        return true;
    }
    async sellItem(info) {
        const item = await this.itemRepository.findOne({
            relations: ['loot_id', 'bag_id'],
            where: {
                item_id: info.item_id,
            },
        });
        const bag = await this.bagRepository.findOne({
            where: {
                bag_id: info.bag_id,
            },
        });
        const equipment = await this.equipmentRepository.findOne({
            relations: [
                'helmet_id',
                'chestplate_id',
                'gloves_id',
                'boots_id',
                'primary_weapon_id',
                'secondary_weapon_id',
                'primary_magic_item_id',
                'secondary_magic_item_id',
            ],
            where: {
                equipment_id: info.equipment_id,
            },
        });
        const character = await this.characterRepository.findOne({
            where: {
                character_id: info.character_id,
            },
        });
        if (!item || !bag || !equipment || !character) {
            throw new common_1.NotFoundException('Item, bag, equipment or character not found');
        }
        Object.keys(equipment).forEach((key) => {
            if (equipment[key] && equipment[key].item_id === item.item_id) {
                equipment[key] = null;
            }
        });
        character.money += item.price;
        item.bag_id = null;
        item.owned = false;
        await this.characterRepository.save(character);
        await this.itemRepository.save(item);
        await this.equipmentRepository.save(equipment);
        return true;
    }
    async buyItem(info) {
        const item = await this.itemRepository.findOne({
            where: {
                item_id: info.item_id,
            },
        });
        const bag = await this.bagRepository.findOne({
            where: {
                bag_id: info.bag_id,
            },
        });
        const character = await this.characterRepository.findOne({
            where: {
                character_id: info.character_id,
            },
        });
        console.log(item, bag, character);
        if (!item || !bag || !character) {
            throw new common_1.NotFoundException('Item, bag or character not found');
        }
        if (item.in_shop === null) {
            throw new common_1.NotFoundException('Item is not in the shop');
        }
        character.money -= item.price;
        const updatedItem = { ...item };
        updatedItem.bag_id = bag.bag_id;
        updatedItem.owned = true;
        updatedItem.in_shop = null;
        console.log(updatedItem);
        await this.characterRepository.save(character);
        await this.itemRepository.save(updatedItem);
        return true;
    }
    async shopList(charactedId) {
        const character = await this.characterRepository.findOne({
            where: {
                character_id: charactedId,
            },
        });
        const items = await this.itemRepository.find({
            relations: ['in_shop'],
            where: {
                in_shop: {
                    character_id: charactedId,
                },
            },
        });
        if (items.length < constants_1.ITEM_IN_SHOP || !items) {
            const itemsNotOwned = await this.itemRepository.find({
                relations: ['in_shop'],
                where: {
                    owned: false,
                    in_shop: {
                        character_id: (0, typeorm_2.IsNull)(),
                    },
                    level: (0, typeorm_2.LessThan)(character.level + 1),
                },
            });
            let randomItems = [...items];
            if (itemsNotOwned.length > 0) {
                if (itemsNotOwned.length < constants_1.ITEM_IN_SHOP - items.length) {
                    randomItems = [...items, ...itemsNotOwned];
                }
                else {
                    for (let i = randomItems.length || 0; i < constants_1.ITEM_IN_SHOP; i++) {
                        randomItems.push(itemsNotOwned[Math.floor(Math.random() * itemsNotOwned.length)]);
                    }
                }
            }
            const allLootTables = await this.lootTablesService.findAll();
            for (let i = randomItems.length || 0; i < constants_1.ITEM_IN_SHOP; i++) {
                const item = await this.generateItemFromLootTable(allLootTables[Math.floor(Math.random() * allLootTables.length)]
                    .loot_table_id, character.level);
                randomItems.push(item);
            }
            for (const item of randomItems) {
                item.in_shop = character;
                await this.itemRepository.save(item);
            }
            return randomItems;
        }
        else {
            return items;
        }
    }
    async testProbability() {
        const counts = {
            common: 0,
            uncommon: 0,
            rare: 0,
            epic: 0,
            legendary: 0,
        };
        for (let i = 0; i < 1000; i++) {
            const rarity = (0, functions_1.randomRarity)('Legendary');
            counts[rarity.toLowerCase()]++;
        }
        return counts;
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Items_1.Item)),
    __param(1, (0, typeorm_1.InjectRepository)(Bag_1.Bag)),
    __param(2, (0, typeorm_1.InjectRepository)(Equipment_1.Equipment)),
    __param(3, (0, typeorm_1.InjectRepository)(Character_1.Character)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        loot_tables_service_1.LootTablesService])
], ItemsService);
//# sourceMappingURL=items.service.js.map