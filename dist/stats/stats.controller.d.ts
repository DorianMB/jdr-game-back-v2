import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { Stat } from '../entities/Stat';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    create(createStatDto: CreateStatDto): Promise<Stat>;
    findAll(): Promise<Stat[]>;
    findOne(id: string): Promise<Stat>;
    update(updateStatDto: UpdateStatDto): Promise<Stat>;
    remove(id: string): Promise<void>;
}
