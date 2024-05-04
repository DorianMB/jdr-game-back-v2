import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { ENTITIES, PROVIDERS } from '../utils/module.constants';

@Module({
  imports: [ENTITIES],
  controllers: [EquipmentsController],
  providers: [...PROVIDERS],
  exports: [EquipmentsService],
})
export class EquipmentsModule {}
