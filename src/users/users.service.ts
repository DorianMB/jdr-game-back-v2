import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<object[]> {
    const users = (await this.usersRepository.find()).map((user) => {
      delete user.password;
      return user;
    });
    console.log(users);
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        user_id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.password;
    return user;
  }

  async findByMail(mail: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        mail,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(user: Partial<User>): Promise<User> {
    return await this.usersRepository.save(user);
  }
}
