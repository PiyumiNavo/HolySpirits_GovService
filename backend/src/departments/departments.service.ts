import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class DepartmentsService extends BaseService {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentDocument>,
  ) {
    super();
  }

  async findAll() {
    const departments = await this.departmentModel.find().exec();
    return this.success(departments, 'Departments retrieved successfully');
  }

  async findById(id: Types.ObjectId | string): Promise<DepartmentDocument> {
    const department = await this.departmentModel.findById(id).exec();
    if (!department) {
      throw new NotFoundException(
        `Department with ID ${id.toString()} not found`,
      );
    }
    return department;
  }

  async getDepartmentById(id: Types.ObjectId | string) {
    const department = await this.findById(id);
    return this.success(department, 'Department retrieved successfully');
  }

  async findByName(name: string): Promise<DepartmentDocument | null> {
    return this.departmentModel.findOne({ name }).exec();
  }

  async create(
    createDepartmentDto: CreateDepartmentDto,
    createdByUserId: Types.ObjectId | string,
  ) {
    // Check if department name already exists
    const existingDepartment = await this.findByName(createDepartmentDto.name);
    if (existingDepartment) {
      throw new ConflictException('Department with this name already exists');
    }

    // Check for duplicate code if provided
    if (createDepartmentDto.code) {
      const departmentWithCode = await this.departmentModel
        .findOne({ code: createDepartmentDto.code })
        .exec();
      if (departmentWithCode) {
        throw new ConflictException('Department with this code already exists');
      }
    }

    const newDepartment = new this.departmentModel({
      ...createDepartmentDto,
      createdBy: createdByUserId,
    });

    const department = await newDepartment.save();
    return this.success(department, 'Department created successfully');
  }

  async update(
    id: Types.ObjectId | string,
    updateData: Partial<CreateDepartmentDto>,
  ) {
    // Check if department exists
    const department = await this.findById(id);

    // Check for name uniqueness if name is being updated
    if (updateData.name && updateData.name !== department.name) {
      const existingDepartment = await this.findByName(updateData.name);
      if (existingDepartment) {
        throw new ConflictException('Department with this name already exists');
      }
    }

    // Check for code uniqueness if code is being updated
    if (updateData.code && updateData.code !== department.code) {
      const departmentWithCode = await this.departmentModel
        .findOne({ code: updateData.code })
        .exec();
      if (departmentWithCode) {
        throw new ConflictException('Department with this code already exists');
      }
    }

    // Update department
    const updatedDepartment = await this.departmentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    return this.success(updatedDepartment!, 'Department updated successfully');
  }

  async delete(id: Types.ObjectId | string) {
    const deletedDepartment = await this.departmentModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedDepartment) {
      throw new NotFoundException(
        `Department with ID ${id.toString()} not found`,
      );
    }

    return this.success(deletedDepartment, 'Department deleted successfully');
  }
}
