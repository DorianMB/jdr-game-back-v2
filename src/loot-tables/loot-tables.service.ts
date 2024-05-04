import { Injectable } from '@nestjs/common';
import { CreateLootTableDto } from './dto/create-loot-table.dto';
import { UpdateLootTableDto } from './dto/update-loot-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LootTable } from '../entities/LootTable';
import { Repository } from 'typeorm';
import {
  ARMOR_TYPE_LIST,
  CHARM_TYPE_LIST,
  LOOT_BASE_PICTURE,
  LOOT_STATS_TYPE_LIST,
  LOOT_TYPE_LIST,
  PRIMARY_WEAPON_TYPE_LIST,
  RARITY_LIST,
  STATS_TYPE_LIST,
} from '../utils/constants';
import {
  convertEmptyStringToNull,
  lootTableStatMinMax,
} from '../utils/functions';

@Injectable()
export class LootTablesService {
  constructor(
    @InjectRepository(LootTable)
    private lootTableRepository: Repository<LootTable>,
  ) {}

  //CRUD

  async create(createLootTableDto: CreateLootTableDto): Promise<LootTable> {
    createLootTableDto = convertEmptyStringToNull(createLootTableDto);
    createLootTableDto.created_at = new Date();
    createLootTableDto.updated_at = new Date();
    return await this.lootTableRepository.save(createLootTableDto);
  }

  async findAll(): Promise<LootTable[]> {
    return await this.lootTableRepository.find();
  }

  async findOne(id: number): Promise<LootTable> {
    return await this.lootTableRepository.findOne({
      where: {
        loot_table_id: id,
      },
    });
  }

  async update(updateLootTableDto: UpdateLootTableDto): Promise<LootTable> {
    updateLootTableDto = convertEmptyStringToNull(updateLootTableDto);
    updateLootTableDto.updated_at = new Date();
    return await this.lootTableRepository.save(updateLootTableDto);
  }

  async remove(id: number): Promise<void> {
    await this.lootTableRepository.delete(id);
  }

  // Other methods
  async getRandomLootTable(): Promise<any> {
    const lootTable = new LootTable();
    const url = LOOT_BASE_PICTURE;
    // get random loot type and rarity
    const lootType =
      LOOT_TYPE_LIST[Math.floor(Math.random() * LOOT_TYPE_LIST.length)];
    const rarity = RARITY_LIST[Math.floor(Math.random() * RARITY_LIST.length)];
    // set loot table properties
    lootTable.name = lootType + ' du random';
    lootTable.description = 'Description du ' + lootType + ' random';
    lootTable.picture = url;
    if (PRIMARY_WEAPON_TYPE_LIST.includes(lootType)) {
      lootTable.fight_picture = url;
    }
    lootTable.type = lootType;
    lootTable.rarity = rarity;

    // set stats min and max
    if (ARMOR_TYPE_LIST.includes(lootType)) {
      LOOT_STATS_TYPE_LIST.forEach((stat) => {
        const res = lootTableStatMinMax();
        lootTable[stat + '_min'] = res[0];
        lootTable[stat + '_max'] = res[1];
      });
    } else {
      STATS_TYPE_LIST.forEach((stat) => {
        const res = lootTableStatMinMax();
        lootTable[stat + '_min'] = res[0];
        lootTable[stat + '_max'] = res[1];
      });
    }

    // set charm
    lootTable.charm = Math.random() > 0.5;
    if (lootTable.charm) {
      lootTable.charm_type =
        CHARM_TYPE_LIST[Math.floor(Math.random() * CHARM_TYPE_LIST.length)];
      lootTable.charm_value = Math.floor(Math.random() * 100);
    }

    // set created_at and updated_at
    lootTable.created_at = new Date();
    lootTable.updated_at = new Date();

    return await this.lootTableRepository.save(lootTable);
  }
}
