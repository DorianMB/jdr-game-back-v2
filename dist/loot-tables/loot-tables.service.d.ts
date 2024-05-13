import { CreateLootTableDto } from './dto/create-loot-table.dto';
import { UpdateLootTableDto } from './dto/update-loot-table.dto';
import { LootTable } from '../entities/LootTable';
import { Repository } from 'typeorm';
export declare class LootTablesService {
    private lootTableRepository;
    constructor(lootTableRepository: Repository<LootTable>);
    create(createLootTableDto: CreateLootTableDto): Promise<LootTable>;
    findAll(): Promise<LootTable[]>;
    findOne(id: number): Promise<LootTable>;
    update(updateLootTableDto: UpdateLootTableDto): Promise<LootTable>;
    remove(id: number): Promise<void>;
    getRandomLootTable(): Promise<any>;
}
