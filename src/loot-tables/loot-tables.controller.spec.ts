import { Test, TestingModule } from '@nestjs/testing';
import { LootTablesController } from './loot-tables.controller';
import { LootTablesService } from './loot-tables.service';

describe('LootTablesController', () => {
  let controller: LootTablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LootTablesController],
      providers: [LootTablesService],
    }).compile();

    controller = module.get<LootTablesController>(LootTablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
