import { Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stat } from '../entities/Stat';
import { Repository } from 'typeorm';
import { convertEmptyStringToNull } from '../utils/functions';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stat)
    private statRepository: Repository<Stat>,
  ) {}

  async create(createStatDto: CreateStatDto): Promise<Stat> {
    createStatDto = convertEmptyStringToNull(createStatDto);
    createStatDto.created_at = new Date();
    createStatDto.updated_at = new Date();
    return await this.statRepository.save(createStatDto);
  }

  async findAll(): Promise<Stat[]> {
    return await this.statRepository.find();
  }

  async findOne(id: number): Promise<Stat> {
    return await this.statRepository.findOne({
      where: {
        stat_id: id,
      },
    });
  }

  async update(updateStatDto: UpdateStatDto): Promise<Stat> {
    updateStatDto = convertEmptyStringToNull(updateStatDto);
    updateStatDto.updated_at = new Date();
    return await this.statRepository.save(updateStatDto);
  }

  async remove(id: number): Promise<void> {
    await this.statRepository.delete(id);
  }
}
