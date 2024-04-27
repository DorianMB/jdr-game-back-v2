import { Injectable } from '@nestjs/common';
import { User } from './entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/Character';
import { Stat } from './entities/Stat';
import { Bag } from './entities/Bag';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) { }

  getHello(): string {
    return 'Hello World! from back';
  }

  async postTest(user: User): Promise<string> {
    console.log(user);
    try {
      const newUser = await this.usersRepository.save(user)
      console.log('User has been saved', newUser);
      this.postCharacter({
        user_id: newUser,
        experience: 0,
        money: 0,
        stat_id: new Stat(),
        bag_id: new Bag(),
        caracter_id: 0,
        equipment: null,
        picture: ''
      })
      return 'User has been saved';
    } catch (error) {
      console.log('Error while saving user', error);
      return 'Error while saving user';
    }
  }

  async postCharacter(caracter: Character): Promise<string> {
    console.log(caracter);
    try {
      const newCharacter = await this.characterRepository.save(caracter)
      console.log('Character has been saved', newCharacter);
      return 'Character has been saved';
    } catch (error) {
      console.log('Error while saving character', error);
      return 'Error while saving character';
    }
  }
}
