import { Test, TestingModule } from '@nestjs/testing';
import { BagController } from './bag.controller';
import { BagService } from './bag.service';

describe('BagController', () => {
  let controller: BagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BagController],
      providers: [BagService],
    }).compile();

    controller = module.get<BagController>(BagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
