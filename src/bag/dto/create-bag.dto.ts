import { PartialType } from '@nestjs/mapped-types';
import { Bag } from '../../entities/Bag';

export class CreateBagDto extends PartialType(Bag) {}
