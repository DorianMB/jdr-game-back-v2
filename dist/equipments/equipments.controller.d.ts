import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
export declare class EquipmentsController {
    private readonly equipmentsService;
    constructor(equipmentsService: EquipmentsService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<import("../entities/Equipment").Equipment>;
    findAll(): Promise<import("./dto/send-equipment.dto").SendEquipmentDto[]>;
    findOne(id: string): Promise<import("./dto/send-equipment.dto").SendEquipmentDto>;
    update(updateEquipmentDto: UpdateEquipmentDto): Promise<import("../entities/Equipment").Equipment>;
    remove(id: string): Promise<void>;
}
