import { Test, TestingModule } from '@nestjs/testing';
import { VinculacionController } from './vinculacion.controller';
import { VinculacionService } from './vinculacion.service';

describe('VinculacionController', () => {
  let controller: VinculacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VinculacionController],
      providers: [VinculacionService],
    }).compile();

    controller = module.get<VinculacionController>(VinculacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
