import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/User';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    generateJwt(user: User): Promise<string>;
    validateUser(payload: any): Promise<User>;
    signup(user: Partial<User>): Promise<User>;
    signin(user: Partial<User>): Promise<string>;
}
