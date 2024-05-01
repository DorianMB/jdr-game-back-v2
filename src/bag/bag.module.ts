import { Module } from '@nestjs/common';
import { BagService } from './bag.service';
import { BagController } from './bag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bag } from '../entities/Bag';

@Module({
  imports: [TypeOrmModule.forFeature([Bag])],
  controllers: [BagController],
  providers: [BagService],
  exports: [BagService],
})
export class BagModule {}
