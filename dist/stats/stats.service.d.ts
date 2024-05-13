import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { Stat } from '../entities/Stat';
import { Repository } from 'typeorm';
export declare class StatsService {
    private statRepository;
    constructor(statRepository: Repository<Stat>);
    create(createStatDto: CreateStatDto): Promise<Stat>;
    findAll(): Promise<Stat[]>;
    findOne(id: number): Promise<Stat>;
    update(updateStatDto: UpdateStatDto): Promise<Stat>;
    remove(id: number): Promise<void>;
}
