import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/Items';
import { IsNull, LessThan, Repository } from 'typeorm';
import { SendItemDto } from './dto/send-item.dto';
import {
  convertEmptyStringToNull,
  randomBetween,
  randomRarity,
} from '../utils/functions';
import { LootTablesService } from '../loot-tables/loot-tables.service';
import {
  BASE_STAT_BY_RARIY,
  CHARM_TYPE_LIST,
  ITEM_IN_SHOP,
  PRIMARY_WEAPON_TYPE_LIST,
  SECONDARY_WEAPON_TYPE_LIST,
} from '../utils/constants';
import { EquipDto } from './dto/equip.dto';
import { Bag } from '../entities/Bag';
import { Equipment } from '../entities/Equipment';
import { SellDto } from './dto/sell.dto';
import { Character } from '../entities/Character';
import { BuyDto } from './dto/buy.dto';

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
    if (typeof updateItemDto.created_at === 'object') {
      updateItemDto.created_at = new Date();
    }
    updateItemDto.updated_at = new Date();
    return await this.itemRepository.save(updateItemDto);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }

  async generateItemFromLootTable(
    lootTableId: number,
    level?: number,
  ): Promise<Item> {
    // récupération des données de la loot table
    const lootTable = await this.lootTablesService.findOne(lootTableId);

    if (!lootTable) {
      throw new NotFoundException('Loot table not found');
    }

    if (level === null) {
      level = Math.floor(Math.random() * 100);
    }
    if (level < 1) {
      level = 1;
    }

    let newItem = new Item();

    newItem.loot_id = lootTable;
    newItem.bag_id = null;
    newItem.level = level;
    newItem.rarity = randomRarity(lootTable.rarity);

    // set stats min and max
    newItem.strength = Math.floor(
      (randomBetween(lootTable.strength_min, lootTable.strength_max) *
        BASE_STAT_BY_RARIY[newItem.rarity] *
        level) /
        10,
    );
    newItem.intelligence = Math.floor(
      (randomBetween(lootTable.intelligence_min, lootTable.intelligence_max) *
        BASE_STAT_BY_RARIY[newItem.rarity] *
        level) /
        10,
    );
    newItem.speed = Math.floor(
      (randomBetween(lootTable.speed_min, lootTable.speed_max) *
        BASE_STAT_BY_RARIY[newItem.rarity] *
        level) /
        10,
    );
    newItem.charisma = Math.floor(
      (randomBetween(lootTable.charisma_min, lootTable.charisma_max) *
        BASE_STAT_BY_RARIY[newItem.rarity] *
        level) /
        10,
    );
    newItem.health = Math.floor(
      (randomBetween(lootTable.health_min, lootTable.health_max) *
        BASE_STAT_BY_RARIY[newItem.rarity] *
        level) /
        10,
    );
    newItem.luck = Math.floor(
      (randomBetween(lootTable.luck_min, lootTable.luck_max) *
        BASE_STAT_BY_RARIY[newItem.rarity] *
        level) /
        10,
    );
    newItem.charm = lootTable.charm ? true : Math.random() > 0.5;

    //set charm
    if (newItem.charm) {
      newItem.charm_type = lootTable.charm_type
        ? lootTable.charm_type
        : CHARM_TYPE_LIST[Math.floor(Math.random() * CHARM_TYPE_LIST.length)];
      newItem.charm_value = lootTable.charm_value
        ? randomBetween(
            Math.floor(
              Math.random() * BASE_STAT_BY_RARIY[newItem.rarity] * level,
            ) / 10,
            lootTable.charm_value,
          )
        : Math.floor(
            Math.random() * BASE_STAT_BY_RARIY[newItem.rarity] * level,
          ) / 10;
    }

    newItem.price = Math.floor(
      (newItem.strength +
        newItem.intelligence +
        newItem.speed +
        newItem.charisma +
        newItem.health +
        newItem.luck) /
        6,
    );

    if (newItem.price <= 0) {
      newItem.price = 1;
    }

    newItem.created_at = new Date();
    newItem.updated_at = new Date();

    newItem = await this.itemRepository.save(newItem);
    newItem.loot_id = lootTable;
    return newItem;
  }

  async equipItem(info: EquipDto): Promise<boolean> {
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
    if (ItemsInBag && ItemsInBag.length >= bag.size) {
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
    item.owned = false;
    await this.characterRepository.save(character);
    await this.itemRepository.save(item);
    await this.equipmentRepository.save(equipment);
    return true;
  }

  async buyItem(info: BuyDto): Promise<boolean> {
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
    if (!item || !bag || !character) {
      throw new NotFoundException('Item, bag or character not found');
    }
    if (item.in_shop === null) {
      throw new NotFoundException('Item is not in the shop');
    }
    character.money -= item.price;
    const updatedItem = { ...item } as UpdateItemDto;
    updatedItem.bag_id = bag.bag_id as Partial<Bag>;
    updatedItem.owned = true;
    updatedItem.in_shop = null;
    await this.characterRepository.save(character);
    await this.itemRepository.save(updatedItem);
    return true;
  }

  async shopList(charactedId: number): Promise<Item[]> {
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
    if (items.length < ITEM_IN_SHOP || !items) {
      const itemsNotOwned = await this.itemRepository.find({
        relations: ['in_shop'],
        where: {
          owned: false,
          in_shop: {
            character_id: IsNull(),
          },
          level: LessThan(character.level + 1),
        },
      });
      let randomItems = [...items];
      if (itemsNotOwned.length > 0) {
        if (itemsNotOwned.length < ITEM_IN_SHOP - items.length) {
          randomItems = [...items, ...itemsNotOwned];
        } else {
          for (let i = randomItems.length || 0; i < ITEM_IN_SHOP; i++) {
            randomItems.push(
              itemsNotOwned[Math.floor(Math.random() * itemsNotOwned.length)],
            );
          }
        }
      }
      const allLootTables = await this.lootTablesService.findAll();
      for (let i = randomItems.length || 0; i < ITEM_IN_SHOP; i++) {
        const item: Item = await this.generateItemFromLootTable(
          allLootTables[Math.floor(Math.random() * allLootTables.length)]
            .loot_table_id,
          character.level,
        );
        randomItems.push(item);
      }
      for (const item of randomItems) {
        item.in_shop = character;
        await this.itemRepository.save(item);
      }
      return randomItems;
    } else {
      return items;
    }
  }

  async testProbability(): Promise<any> {
    const counts = {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
    };

    for (let i = 0; i < 1000; i++) {
      const rarity = randomRarity('Legendary');
      counts[rarity.toLowerCase()]++;
    }

    return counts;
  }
}
