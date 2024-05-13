import { UsersService } from './users.service';
import { User } from '../entities/User';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAllUsers(): Promise<object[]>;
    findUserById(id: string): Promise<User>;
    updateUser(user: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
