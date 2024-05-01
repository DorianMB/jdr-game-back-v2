import { PartialType } from '@nestjs/mapped-types';
import { LootTable } from '../../entities/LootTable';

export class CreateLootTableDto extends PartialType(LootTable) {}
