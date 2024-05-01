import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from '../entities/Character';
import { Repository } from 'typeorm';
import { CharaterSendDto } from './dto/charater.send.dto';
import { BagService } from '../bag/bag.service';
import { EquipmentsService } from '../equipments/equipments.service';
import { StatsService } from '../stats/stats.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    private bagService: BagService,
    private equipmentsService: EquipmentsService,
    private statsService: StatsService,
  ) {}

  async findAllCharacters(): Promise<CharaterSendDto[]> {
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

  async createCharacter(
    character: Partial<Character>,
  ): Promise<CharaterSendDto> {
    character.created_at = new Date();
    character.updated_at = new Date();
    character.bag_id = await this.bagService.create({ length: 5 });
    character.equipment_id = await this.equipmentsService.create({});
    character.stat_id = await this.statsService.create({
      strength: 10,
      intelligence: 10,
      speed: 10,
      charisma: 10,
      health: 10,
      luck: 10,
    });
    const newCharacter = await this.charactersRepository.save(character);
    return {
      ...newCharacter,
      user_id: character.user_id?.user_id
        ? character.user_id?.user_id
        : character.user_id,
      equipment_id: newCharacter.equipment_id?.equipment_id,
      stat_id: newCharacter.stat_id?.stat_id,
      bag_id: newCharacter.bag_id?.bag_id,
    };
  }

  async patchCharacter(
    character: Partial<Character>,
  ): Promise<CharaterSendDto> {
    character.updated_at = new Date();
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
    await this.charactersRepository.delete(id);
  }
}
