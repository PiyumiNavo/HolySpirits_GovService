import { Test, TestingModule } from '@nestjs/testing';
import { GovServicesController } from './gov-services.controller';

describe('GovServicesController', () => {
  let controller: GovServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GovServicesController],
    }).compile();

    controller = module.get<GovServicesController>(GovServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
