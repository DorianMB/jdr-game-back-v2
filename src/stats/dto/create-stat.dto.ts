import { PartialType } from '@nestjs/mapped-types';
import { Stat } from '../../entities/Stat';

export class CreateStatDto extends PartialType(Stat) {}
