import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from '../entities/Character';
import { Repository } from 'typeorm';
import { CharacterSendDto } from './dto/character.send.dto';
import { BagService } from '../bag/bag.service';
import { EquipmentsService } from '../equipments/equipments.service';
import { LootTablesService } from '../loot-tables/loot-tables.service';
import { StatsService } from '../stats/stats.service';
import { User } from '../entities/User';
import { Equipment } from '../entities/Equipment';
import {
  convertEmptyStringToNull,
  getLevelByExperience,
  isVictory,
  randomEnemy,
  simulateRounds,
} from '../utils/functions';
import { FightDto } from './dto/fight.dto';
import { ItemsService } from '../items/items.service';
import { Item } from '../entities/Items';
import { Bag } from '../entities/Bag';
import { LootTable } from '../entities/LootTable';
import { UpdateItemDto } from '../items/dto/update-item.dto';
import { HAND_PICTURE } from '../utils/constants';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    private bagService: BagService,
    private equipmentsService: EquipmentsService,
    private statsService: StatsService,
    private lootTablesService: LootTablesService,
    private itemsService: ItemsService,
  ) {}

  async findAllCharacters(): Promise<CharacterSendDto[]> {
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

  async findAllCharacterByUserId(user_id: number): Promise<CharacterSendDto[]> {
    return await this.charactersRepository.find({
      where: { user_id: user_id as Partial<User> },
      relations: ['user_id', 'equipment_id', 'stat_id', 'bag_id'],
    });
  }

  async findCharacterById(id: number): Promise<Character> {
    const character = await this.charactersRepository.findOne({
      where: { character_id: id },
      relations: ['user_id', 'equipment_id', 'stat_id', 'bag_id'],
    });
    const equipment = await this.equipmentsService.findOneCascade(
      character.equipment_id.equipment_id,
    );
    character.equipment_id = equipment as Equipment;
    return character;
  }

  async createCharacter(
    character: Partial<Character>,
  ): Promise<CharacterSendDto> {
    character = convertEmptyStringToNull(character);
    character.money = character.money || 0;
    character.experience = character.experience || 0;
    character.level =
      character.level || getLevelByExperience(character.experience);
    character.experience_points = character.experience_points || 0;
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

  async patchCharacter(
    character: Partial<Character>,
  ): Promise<CharacterSendDto> {
    character = convertEmptyStringToNull(character);
    character.updated_at = new Date();
    character.level = getLevelByExperience(character.experience);
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

  async deleteCharacter(id: number): Promise<void> {
    const character = await this.findCharacterById(id);
    await this.charactersRepository.delete(id);
    await this.bagService.remove(character.bag_id.bag_id);
    await this.equipmentsService.remove(character.equipment_id.equipment_id);
    await this.statsService.remove(character.stat_id.stat_id);
  }

  async simulateFight(id: number): Promise<FightDto> {
    const character = await this.findCharacterById(id);
    const newFight = new FightDto();
    newFight.characterWeapon = {} as any;
    newFight.characterWeapon.picture = character.equipment_id.primary_weapon_id
      ? character.equipment_id.primary_weapon_id.loot_id.fight_picture
      : HAND_PICTURE;
    newFight.characterWeapon.type = character.equipment_id.primary_weapon_id
      ? character.equipment_id.primary_weapon_id.loot_id.type
      : 'hand';
    console.log(character);
    newFight.enemy = randomEnemy(character);
    newFight.rounds = simulateRounds(character, newFight.enemy);
    newFight.isVictory = isVictory(newFight.rounds);
    if (newFight.isVictory) {
      character.experience +=
        newFight.enemy.level === 0 ? 1 : newFight.enemy.level;
      const newLevel = getLevelByExperience(character.experience);
      if (newLevel > character.level) {
        character.experience_points = newLevel - character.level;
        character.level = newLevel;
      }

      const allLootTables = await this.lootTablesService.findAll();
      const treasure: Item = await this.itemsService.generateItemFromLootTable(
        allLootTables[Math.floor(Math.random() * allLootTables.length)]
          .loot_table_id,
        newFight.enemy.level,
      );
      const newUpdateItem = { ...treasure } as UpdateItemDto;
      newUpdateItem.created_at = treasure.created_at;
      newUpdateItem.bag_id = character.bag_id.bag_id as Partial<Bag>;
      newUpdateItem.loot_id = treasure.loot_id
        .loot_table_id as Partial<LootTable>;
      newUpdateItem.owned = true;
      const treasureUpdated = await this.itemsService.update(newUpdateItem);
      treasureUpdated.loot_id = treasure.loot_id;
      newFight.treasure = treasureUpdated;
      await this.patchCharacter(character);
    }
    return newFight;
  }
}
