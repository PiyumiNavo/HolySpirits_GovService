import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class LocationsService extends BaseService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
  ) {
    super();
  }

  async findAll(): Promise<LocationDocument[]> {
    return this.locationModel.find().exec();
  }

  async findById(id: Types.ObjectId | string): Promise<LocationDocument> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException(
        `Location with ID ${id.toString()} not found`,
      );
    }
    return location;
  }

  async findByDepartmentId(
    departmentId: Types.ObjectId | string,
  ): Promise<LocationDocument[]> {
    return this.locationModel.find({ departmentId }).exec();
  }

  async create(
    createLocationDto: CreateLocationDto,
  ): Promise<LocationDocument> {
    const newLocation = new this.locationModel(createLocationDto);
    return newLocation.save();
  }

  async update(
    id: Types.ObjectId | string,
    updateData: Partial<CreateLocationDto>,
  ): Promise<LocationDocument> {
    const updatedLocation = await this.locationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedLocation) {
      throw new NotFoundException(
        `Location with ID ${id.toString()} not found`,
      );
    }

    return updatedLocation;
  }

  async delete(id: Types.ObjectId | string): Promise<LocationDocument> {
    const deletedLocation = await this.locationModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedLocation) {
      throw new NotFoundException(
        `Location with ID ${id.toString()} not found`,
      );
    }

    return deletedLocation;
  }
}
