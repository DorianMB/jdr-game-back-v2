import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from '../entities/Equipment';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    createEquipmentDto.created_at = new Date();
    createEquipmentDto.updated_at = new Date();
    return await this.equipmentRepository.save(createEquipmentDto);
  }

  async findAll(): Promise<Equipment[]> {
    return await this.equipmentRepository.find();
  }

  async findOne(id: number): Promise<Equipment> {
    return await this.equipmentRepository.findOne({
      where: {
        equipment_id: id,
      },
    });
  }

  async update(updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    updateEquipmentDto.updated_at = new Date();
    return await this.equipmentRepository.save(updateEquipmentDto);
  }

  async remove(id: number): Promise<void> {
    await this.equipmentRepository.delete(id);
  }
}
