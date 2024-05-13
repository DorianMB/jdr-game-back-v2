import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAllUsers(): Promise<object[]>;
    findById(id: number): Promise<User>;
    findByMail(mail: string): Promise<User>;
    createUser(user: Partial<User>): Promise<User>;
    updateUser(user: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
