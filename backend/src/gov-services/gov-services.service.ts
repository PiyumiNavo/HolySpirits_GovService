import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class GovServicesService extends BaseService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {
    super();
  }

  async findAll(departmentId?: string) {
    const query = departmentId ? { departmentId } : {};
    const services = await this.serviceModel.find(query).exec();
    return this.success(services, 'Services retrieved successfully');
  }

  async findById(id: Types.ObjectId | string): Promise<ServiceDocument> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }
    return service;
  }

  async getServiceById(id: Types.ObjectId | string) {
    const service = await this.findById(id);
    return this.success(service, 'Service retrieved successfully');
  }

  async create(
    createServiceDto: CreateServiceDto,
    createdByUserId: Types.ObjectId | string,
  ) {
    const newService = new this.serviceModel({
      ...createServiceDto,
      createdBy: createdByUserId,
    });
    const service = await newService.save();
    return this.success(service, 'Service created successfully');
  }

  async update(
    id: Types.ObjectId | string,
    updateData: Partial<CreateServiceDto>,
  ) {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }

    return this.success(updatedService, 'Service updated successfully');
  }

  async delete(id: Types.ObjectId | string) {
    const deletedService = await this.serviceModel.findByIdAndDelete(id).exec();

    if (!deletedService) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }

    return this.success(deletedService, 'Service deleted successfully');
  }

  async publishService(id: Types.ObjectId | string) {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, { isPublished: true }, { new: true })
      .exec();

    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }

    return this.success(updatedService, 'Service published successfully');
  }

  async unpublishService(id: Types.ObjectId | string) {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, { isPublished: false }, { new: true })
      .exec();

    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }

    return this.success(updatedService, 'Service unpublished successfully');
  }

  async getPublishedServices(departmentId?: string) {
    const query = departmentId
      ? { departmentId, isPublished: true }
      : { isPublished: true };

    const services = await this.serviceModel.find(query).exec();
    return this.success(services, 'Published services retrieved successfully');
  }
}
