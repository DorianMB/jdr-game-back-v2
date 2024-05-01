import { PartialType } from '@nestjs/mapped-types';
import { CreateLootTableDto } from './create-loot-table.dto';

export class UpdateLootTableDto extends PartialType(CreateLootTableDto) {}
