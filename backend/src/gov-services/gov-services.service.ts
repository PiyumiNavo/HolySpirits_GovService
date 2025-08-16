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

  async findAll(departmentId?: string): Promise<ServiceDocument[]> {
    const query = departmentId ? { departmentId } : {};
    return this.serviceModel.find(query).exec();
  }

  async findById(id: Types.ObjectId | string): Promise<ServiceDocument> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }
    return service;
  }

  async create(
    createServiceDto: CreateServiceDto,
    createdByUserId: Types.ObjectId | string,
  ): Promise<ServiceDocument> {
    const newService = new this.serviceModel({
      ...createServiceDto,
      createdBy: createdByUserId,
    });
    return newService.save();
  }

  async update(
    id: Types.ObjectId | string,
    updateData: Partial<CreateServiceDto>,
  ): Promise<ServiceDocument> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }

    return updatedService;
  }

  async delete(id: Types.ObjectId | string): Promise<ServiceDocument> {
    const deletedService = await this.serviceModel.findByIdAndDelete(id).exec();

    if (!deletedService) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }

    return deletedService;
  }

  async publishService(id: Types.ObjectId | string): Promise<ServiceDocument> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, { isPublished: true }, { new: true })
      .exec();

    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }

    return updatedService;
  }

  async unpublishService(
    id: Types.ObjectId | string,
  ): Promise<ServiceDocument> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, { isPublished: false }, { new: true })
      .exec();

    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id.toString()} not found`);
    }

    return updatedService;
  }

  async getPublishedServices(
    departmentId?: string,
  ): Promise<ServiceDocument[]> {
    const query = departmentId
      ? { departmentId, isPublished: true }
      : { isPublished: true };

    return this.serviceModel.find(query).exec();
  }
}
