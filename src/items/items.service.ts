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
import {
  CHARM_TYPE_LIST,
  PRIMARY_WEAPON_TYPE_LIST,
  SECONDARY_WEAPON_TYPE_LIST,
} from '../utils/constants';
import { EquipDto } from './dto/equip.dto';
import { Bag } from '../entities/Bag';
import { Equipment } from '../entities/Equipment';
import { SellDto } from './dto/sell.dto';
import { Character } from '../entities/Character';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Bag)
    private bagRepository: Repository<Bag>,
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
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
    return await this.itemRepository.findOne({
      relations: ['bag_id', 'loot_id'],
      where: {
        item_id: id,
      },
    });
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

  async equipItem(info: EquipDto): Promise<boolean> {
    const item = await this.itemRepository.findOne({
      relations: ['loot_id', 'bag_id'],
      where: {
        item_id: info.item_id,
      },
    });
    const equipment = await this.equipmentRepository.findOne({
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
      throw new NotFoundException('Item, equipment or bag not found');
    }
    if (item.bag_id.bag_id !== bag.bag_id) {
      throw new NotFoundException('Item is not in the bag');
    }
    item.bag_id = null;
    const typeOfItem = item.loot_id.type;
    let itemToUnequip = null;
    if (PRIMARY_WEAPON_TYPE_LIST.includes(typeOfItem)) {
      itemToUnequip = equipment.primary_weapon_id;
      equipment.primary_weapon_id = item;
    } else if (SECONDARY_WEAPON_TYPE_LIST.includes(typeOfItem)) {
      itemToUnequip = equipment.secondary_weapon_id;
      equipment.secondary_weapon_id = item;
    } else if (typeOfItem === 'magic_item') {
      if (!equipment.primary_magic_item_id) {
        equipment.primary_magic_item_id = item;
      } else if (!equipment.secondary_magic_item_id) {
        equipment.secondary_magic_item_id = item;
      } else {
        itemToUnequip = equipment.primary_magic_item_id;
        equipment.primary_magic_item_id = item;
      }
    } else {
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

  async putInBag(info: EquipDto): Promise<boolean> {
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
        bag_id: bag.bag_id as Partial<Bag>,
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
      throw new NotFoundException('Item, bag or equipment not found');
    }
    if (ItemsInBag && ItemsInBag.length >= bag.length) {
      throw new NotFoundException('Bag is full');
    }
    if (item.bag_id) {
      throw new NotFoundException('Item is already in a bag');
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

  async sellItem(info: SellDto): Promise<boolean> {
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
    console.log(item, bag, equipment, character);
    if (!item || !bag || !equipment || !character) {
      throw new NotFoundException(
        'Item, bag, equipment or character not found',
      );
    }
    Object.keys(equipment).forEach((key) => {
      if (equipment[key] && equipment[key].item_id === item.item_id) {
        equipment[key] = null;
      }
    });
    character.money += item.price;
    item.bag_id = null;
    await this.characterRepository.save(character);
    await this.itemRepository.save(item);
    await this.equipmentRepository.save(equipment);
    return true;
  }
}
