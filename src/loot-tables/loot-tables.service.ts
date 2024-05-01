import { Injectable } from '@nestjs/common';
import { CreateLootTableDto } from './dto/create-loot-table.dto';
import { UpdateLootTableDto } from './dto/update-loot-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LootTable } from '../entities/LootTable';
import { Repository } from 'typeorm';

@Injectable()
export class LootTablesService {
  constructor(
    @InjectRepository(LootTable)
    private lootTableRepository: Repository<LootTable>,
  ) {}

  async create(createLootTableDto: CreateLootTableDto): Promise<LootTable> {
    createLootTableDto.created_at = new Date();
    createLootTableDto.updated_at = new Date();
    return await this.lootTableRepository.save(createLootTableDto);
  }

  async findAll(): Promise<LootTable[]> {
    return await this.lootTableRepository.find();
  }

  async findOne(id: number): Promise<LootTable> {
    return await this.lootTableRepository.findOne({
      where: {
        loot_table_id: id,
      },
    });
  }

  async update(updateLootTableDto: UpdateLootTableDto): Promise<LootTable> {
    updateLootTableDto.updated_at = new Date();
    return await this.lootTableRepository.save(updateLootTableDto);
  }

  async remove(id: number): Promise<void> {
    await this.lootTableRepository.delete(id);
  }
}
