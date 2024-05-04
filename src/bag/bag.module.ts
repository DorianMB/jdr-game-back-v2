import { Module } from '@nestjs/common';
import { BagService } from './bag.service';
import { BagController } from './bag.controller';
import { ENTITIES, PROVIDERS } from '../utils/module.constants';

@Module({
  imports: [ENTITIES],
  controllers: [BagController],
  providers: [...PROVIDERS],
  exports: [BagService],
})
export class BagModule {}
