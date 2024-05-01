import { PartialType } from '@nestjs/mapped-types';
import { Item } from '../../entities/Items';

export class CreateItemDto extends PartialType(Item) {}
