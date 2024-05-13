import { LootTablesService } from './loot-tables.service';
import { CreateLootTableDto } from './dto/create-loot-table.dto';
import { UpdateLootTableDto } from './dto/update-loot-table.dto';
import { LootTable } from '../entities/LootTable';
export declare class LootTablesController {
    private readonly lootTablesService;
    constructor(lootTablesService: LootTablesService);
    getRandomLootTable(): Promise<any>;
    create(createLootTableDto: CreateLootTableDto): Promise<LootTable>;
    findAll(): Promise<LootTable[]>;
    findOne(id: string): Promise<LootTable>;
    update(updateLootTableDto: UpdateLootTableDto): Promise<LootTable>;
    remove(id: string): Promise<void>;
}
