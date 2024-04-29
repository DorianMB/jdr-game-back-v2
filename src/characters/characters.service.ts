import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from '../entities/Character';
import { Repository } from 'typeorm';
import { CharaterSendDto } from './dto/charater.send.dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
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
    const newCharacter = await this.charactersRepository.save(character);
    console.log('newCharacter', newCharacter);
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
    console.log('id2', id);
    await this.charactersRepository.delete(id);
  }
}
