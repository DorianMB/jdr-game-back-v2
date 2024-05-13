import { User } from './entities/User';
import { Repository } from 'typeorm';
import { Character } from './entities/Character';
export declare class AppService {
    private usersRepository;
    private characterRepository;
    constructor(usersRepository: Repository<User>, characterRepository: Repository<Character>);
    getHello(): string;
    postTest(user: User): Promise<string>;
    postCharacter(caracter: Partial<Character>): Promise<string>;
}
