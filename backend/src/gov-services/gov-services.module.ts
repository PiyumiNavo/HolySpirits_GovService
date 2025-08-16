import { Module } from '@nestjs/common';
import { GovServicesService } from './gov-services.service';
import { GovServicesController } from './gov-services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schemas/service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  providers: [GovServicesService],
  controllers: [GovServicesController],
  exports: [GovServicesService],
})
export class GovServicesModule {}
