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
exports.EquipmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Equipment_1 = require("../entities/Equipment");
const typeorm_2 = require("typeorm");
const functions_1 = require("../utils/functions");
let EquipmentsService = class EquipmentsService {
    constructor(equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }
    async create(createEquipmentDto) {
        createEquipmentDto = (0, functions_1.convertEmptyStringToNull)(createEquipmentDto);
        createEquipmentDto.created_at = new Date();
        createEquipmentDto.updated_at = new Date();
        return await this.equipmentRepository.save(createEquipmentDto);
    }
    async findAll() {
        const equipments = await this.equipmentRepository.find({
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
        });
        return equipments.map((equipment) => {
            return {
                ...equipment,
                helmet_id: equipment.helmet_id?.item_id
                    ? equipment.helmet_id?.item_id
                    : equipment.helmet_id,
                chestplate_id: equipment.chestplate_id?.item_id
                    ? equipment.chestplate_id?.item_id
                    : equipment.chestplate_id,
                gloves_id: equipment.gloves_id?.item_id
                    ? equipment.gloves_id?.item_id
                    : equipment.gloves_id,
                boots_id: equipment.boots_id?.item_id
                    ? equipment.boots_id?.item_id
                    : equipment.boots_id,
                primary_weapon_id: equipment.primary_weapon_id?.item_id
                    ? equipment.primary_weapon_id?.item_id
                    : equipment.primary_weapon_id,
                secondary_weapon_id: equipment.secondary_weapon_id?.item_id
                    ? equipment.secondary_weapon_id?.item_id
                    : equipment.secondary_weapon_id,
                primary_magic_item_id: equipment.primary_magic_item_id?.item_id
                    ? equipment.primary_magic_item_id?.item_id
                    : equipment.primary_magic_item_id,
                secondary_magic_item_id: equipment.secondary_magic_item_id?.item_id
                    ? equipment.secondary_magic_item_id?.item_id
                    : equipment.secondary_magic_item_id,
            };
        });
    }
    async findOne(id) {
        return await this.equipmentRepository.findOne({
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
                equipment_id: id,
            },
        });
    }
    async findOneCascade(id) {
        return await this.equipmentRepository.findOne({
            relations: {
                helmet_id: {
                    loot_id: true,
                },
                chestplate_id: {
                    loot_id: true,
                },
                gloves_id: {
                    loot_id: true,
                },
                boots_id: {
                    loot_id: true,
                },
                primary_weapon_id: {
                    loot_id: true,
                },
                secondary_weapon_id: {
                    loot_id: true,
                },
                primary_magic_item_id: {
                    loot_id: true,
                },
                secondary_magic_item_id: {
                    loot_id: true,
                },
            },
            where: {
                equipment_id: id,
            },
        });
    }
    async update(updateEquipmentDto) {
        updateEquipmentDto = (0, functions_1.convertEmptyStringToNull)(updateEquipmentDto);
        updateEquipmentDto.updated_at = new Date();
        return await this.equipmentRepository.save(updateEquipmentDto);
    }
    async remove(id) {
        await this.equipmentRepository.delete(id);
    }
};
exports.EquipmentsService = EquipmentsService;
exports.EquipmentsService = EquipmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Equipment_1.Equipment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EquipmentsService);
//# sourceMappingURL=equipments.service.js.map