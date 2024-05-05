import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/Items';
import { Repository } from 'typeorm';
import { SendItemDto } from './dto/send-item.dto';
import {
  convertEmptyStringToNull,
  randomBetween,
  randomRarity,
} from '../utils/functions';
import { LootTablesService } from '../loot-tables/loot-tables.service';
import { CHARM_TYPE_LIST } from '../utils/constants';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private readonly lootTablesService: LootTablesService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    createItemDto = convertEmptyStringToNull(createItemDto);
    createItemDto.created_at = new Date();
    createItemDto.updated_at = new Date();
    return await this.itemRepository.save(createItemDto);
  }

  async findAll(where?: any): Promise<SendItemDto[]> {
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

  async findAllCascade(where?: any): Promise<SendItemDto[]> {
    return await this.itemRepository.find({
      where: where ? where : '',
      relations: ['loot_id'],
    });
  }

  async findOne(id: number): Promise<SendItemDto> {
    const item = await this.itemRepository.findOne({
      relations: ['bag_id', 'loot_id'],
      where: {
        item_id: id,
      },
    });
    return {
      ...item,
      bag_id: item.bag_id?.bag_id ? item.bag_id?.bag_id : item.bag_id,
      loot_id: item.loot_id?.loot_table_id
        ? item.loot_id?.loot_table_id
        : item.loot_id,
    };
  }

  async update(updateItemDto: UpdateItemDto): Promise<Item> {
    updateItemDto = convertEmptyStringToNull(updateItemDto);
    updateItemDto.updated_at = new Date();
    return await this.itemRepository.save(updateItemDto);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }

  async generateItemFromLootTable(lootTableId: number): Promise<Item> {
    // récupération des données de la loot table
    const lootTable = await this.lootTablesService.findOne(lootTableId);

    if (!lootTable) {
      throw new NotFoundException('Loot table not found');
    }

    const newItem = new Item();

    newItem.loot_id = lootTable;
    newItem.bag_id = null;
    newItem.level = Math.floor(Math.random() * 100);
    newItem.price = Math.floor(Math.random() * 100);
    newItem.rarity = randomRarity(lootTable.rarity);

    // set stats min and max
    newItem.strength = randomBetween(
      lootTable.strength_min,
      lootTable.strength_max,
    );
    newItem.intelligence = randomBetween(
      lootTable.intelligence_min,
      lootTable.intelligence_max,
    );
    newItem.speed = randomBetween(lootTable.speed_min, lootTable.speed_max);
    newItem.charisma = randomBetween(
      lootTable.charisma_min,
      lootTable.charisma_max,
    );
    newItem.health = randomBetween(lootTable.health_min, lootTable.health_max);
    newItem.luck = randomBetween(lootTable.luck_min, lootTable.luck_max);
    newItem.charm = lootTable.charm ? true : Math.random() > 0.5;

    //set charm
    if (newItem.charm) {
      newItem.charm_type = lootTable.charm_type
        ? lootTable.charm_type
        : CHARM_TYPE_LIST[Math.floor(Math.random() * CHARM_TYPE_LIST.length)];
      newItem.charm_value = lootTable.charm_value
        ? lootTable.charm_value
        : Math.floor(Math.random() * 100);
    }

    newItem.created_at = new Date();
    newItem.updated_at = new Date();

    return await this.itemRepository.save(newItem);
  }
}
