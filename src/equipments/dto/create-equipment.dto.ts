import { Equipment } from '../../entities/Equipment';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEquipmentDto extends PartialType(Equipment) {}
