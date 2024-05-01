import { Test, TestingModule } from '@nestjs/testing';
import { LootTablesService } from './loot-tables.service';

describe('LootTablesService', () => {
  let service: LootTablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LootTablesService],
    }).compile();

    service = module.get<LootTablesService>(LootTablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
