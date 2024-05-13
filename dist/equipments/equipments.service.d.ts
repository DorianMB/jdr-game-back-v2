import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from '../entities/Equipment';
import { Repository } from 'typeorm';
import { SendEquipmentDto } from './dto/send-equipment.dto';
export declare class EquipmentsService {
    private equipmentRepository;
    constructor(equipmentRepository: Repository<Equipment>);
    create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>;
    findAll(): Promise<SendEquipmentDto[]>;
    findOne(id: number): Promise<SendEquipmentDto>;
    findOneCascade(id: number): Promise<SendEquipmentDto>;
    update(updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment>;
    remove(id: number): Promise<void>;
}
