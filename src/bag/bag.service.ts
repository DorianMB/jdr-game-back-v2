import { Injectable } from '@nestjs/common';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bag } from '../entities/Bag';
import { Repository } from 'typeorm';
import { convertEmptyStringToNull } from '../utils/functions';
import { ItemsService } from '../items/items.service';
import { SendItemDto } from '../items/dto/send-item.dto';

@Injectable()
export class BagService {
  constructor(
    @InjectRepository(Bag)
    private bagRepository: Repository<Bag>,
    private itemsService: ItemsService,
  ) {}

  async create(createBagDto: CreateBagDto): Promise<Bag> {
    createBagDto = convertEmptyStringToNull(createBagDto);
    createBagDto.created_at = new Date();
    createBagDto.updated_at = new Date();
    return await this.bagRepository.save(createBagDto);
  }

  async findAll(): Promise<Bag[]> {
    return await this.bagRepository.find();
  }

  async findOne(id: number): Promise<Bag> {
    return await this.bagRepository.findOne({
      where: {
        bag_id: id,
      },
    });
  }

  async findItemsByBagId(id: number): Promise<SendItemDto[]> {
    return await this.itemsService.findAllCascade({
      bag_id: id,
    });
  }

  async update(updateBagDto: UpdateBagDto): Promise<Bag> {
    updateBagDto = convertEmptyStringToNull(updateBagDto);
    updateBagDto.updated_at = new Date();
    return await this.bagRepository.save(updateBagDto);
  }

  async remove(id: number): Promise<void> {
    await this.bagRepository.delete(id);
  }

  async findIfBagIsFull(id: number): Promise<boolean> {
    const itemsInBag = await this.findItemsByBagId(id);
    const bag = await this.findOne(id);
    return itemsInBag.length >= bag.size;
  }
}
