import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/User';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateJwt(user: User) {
    const payload = { username: user.name, mail: user.mail, sub: user.user_id };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: any) {
    const user = await this.usersService.findById(payload.sub);

    // Si l'utilisateur n'existe pas ou n'est pas autorisé, retournez null
    if (!user) {
      return null;
    }

    // Sinon, retournez l'utilisateur
    return user;
  }

  async signup(user: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    user.is_admin = 0;
    const newUser = await this.usersService.createUser(user);
    delete newUser.password;
    return newUser;
  }

  async signin(user: Partial<User>): Promise<string> {
    const foundUser = await this.usersService.findByMail(user.mail);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      foundUser.password,
    );
    if (!isPasswordCorrect) {
      throw new NotFoundException('Invalid password');
    }
    delete foundUser.password;
    //generateJwt(foundUser);
    const jwt = await this.generateJwt(foundUser);
    return jwt;
  }
}
