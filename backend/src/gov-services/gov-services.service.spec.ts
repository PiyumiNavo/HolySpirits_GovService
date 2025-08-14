import { Test, TestingModule } from '@nestjs/testing';
import { GovServicesService } from './gov-services.service';

describe('GovServicesService', () => {
  let service: GovServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GovServicesService],
    }).compile();

    service = module.get<GovServicesService>(GovServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
