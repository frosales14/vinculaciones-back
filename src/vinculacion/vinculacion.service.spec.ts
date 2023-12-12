import { Test, TestingModule } from '@nestjs/testing';
import { VinculacionService } from './vinculacion.service';

describe('VinculacionService', () => {
  let service: VinculacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VinculacionService],
    }).compile();

    service = module.get<VinculacionService>(VinculacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
