import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from '../entities/Equipment';
import { Repository } from 'typeorm';
import { SendEquipmentDto } from './dto/send-equipment.dto';
import { convertEmptyStringToNull } from '../utils/functions';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    createEquipmentDto = convertEmptyStringToNull(createEquipmentDto);
    createEquipmentDto.created_at = new Date();
    createEquipmentDto.updated_at = new Date();
    return await this.equipmentRepository.save(createEquipmentDto);
  }

  async findAll(): Promise<SendEquipmentDto[]> {
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

  async findOne(id: number): Promise<SendEquipmentDto> {
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

  async findOneCascade(id: number): Promise<SendEquipmentDto> {
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

  async update(updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    updateEquipmentDto = convertEmptyStringToNull(updateEquipmentDto);
    updateEquipmentDto.updated_at = new Date();
    return await this.equipmentRepository.save(updateEquipmentDto);
  }

  async remove(id: number): Promise<void> {
    await this.equipmentRepository.delete(id);
  }
}
