import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { ENTITIES, PROVIDERS } from '../utils/module.constants';

@Module({
  imports: [ENTITIES],
  controllers: [StatsController],
  providers: [...PROVIDERS],
  exports: [StatsService],
})
export class StatsModule {}
