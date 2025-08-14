import { Module } from '@nestjs/common';
import { GovServicesService } from './gov-services.service';
import { GovServicesController } from './gov-services.controller';

@Module({
  providers: [GovServicesService],
  controllers: [GovServicesController],
})
export class GovServicesModule {}
