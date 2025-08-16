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

  async findAll() {
    const locations = await this.locationModel.find().exec();
    return this.success(locations, 'Locations retrieved successfully');
  }

  async findById(id: Types.ObjectId | string) {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException(
        `Location with ID ${id.toString()} not found`,
      );
    }
    return this.success(location, 'Location retrieved successfully');
  }

  async findByDepartmentId(departmentId: Types.ObjectId | string) {
    const locations = await this.locationModel.find({ departmentId }).exec();
    return this.success(
      locations,
      'Department locations retrieved successfully',
    );
  }

  async create(createLocationDto: CreateLocationDto) {
    const newLocation = new this.locationModel(createLocationDto);
    const location = await newLocation.save();
    return this.success(location, 'Location created successfully');
  }

  async update(
    id: Types.ObjectId | string,
    updateData: Partial<CreateLocationDto>,
  ) {
    const updatedLocation = await this.locationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedLocation) {
      throw new NotFoundException(
        `Location with ID ${id.toString()} not found`,
      );
    }

    return this.success(updatedLocation, 'Location updated successfully');
  }

  async delete(id: Types.ObjectId | string) {
    const deletedLocation = await this.locationModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedLocation) {
      throw new NotFoundException(
        `Location with ID ${id.toString()} not found`,
      );
    }

    return this.success(deletedLocation, 'Location deleted successfully');
  }
}
