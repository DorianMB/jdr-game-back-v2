import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/Items';
import { Repository } from 'typeorm';
import { SendItemDto } from './dto/send-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    createItemDto.created_at = new Date();
    createItemDto.updated_at = new Date();
    return await this.itemRepository.save(createItemDto);
  }

  async findAll(): Promise<SendItemDto[]> {
    const items = await this.itemRepository.find({
      relations: ['bag_id', 'loot_id'],
    });
    return items.map((item) => {
      return {
        ...item,
        bag_id: item.bag_id?.bag_id ? item.bag_id?.bag_id : item.bag_id,
        loot_id: item.loot_id?.loot_table_id
          ? item.loot_id?.loot_table_id
          : item.loot_id,
      };
    });
  }

  async findOne(id: number): Promise<SendItemDto> {
    const item = await this.itemRepository.findOne({
      relations: ['bag_id', 'loot_id'],
      where: {
        item_id: id,
      },
    });
    return {
      ...item,
      bag_id: item.bag_id?.bag_id ? item.bag_id?.bag_id : item.bag_id,
      loot_id: item.loot_id?.loot_table_id
        ? item.loot_id?.loot_table_id
        : item.loot_id,
    };
  }

  async update(updateItemDto: UpdateItemDto): Promise<Item> {
    updateItemDto.updated_at = new Date();
    return await this.itemRepository.save(updateItemDto);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
