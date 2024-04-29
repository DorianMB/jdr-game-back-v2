import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
    user.created_at = new Date();
    user.updated_at = new Date();
    return await this.usersRepository.save(user);
  }

  async updateUser(user: Partial<User>): Promise<User> {
    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
    user.updated_at = new Date();
    const newUser = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
