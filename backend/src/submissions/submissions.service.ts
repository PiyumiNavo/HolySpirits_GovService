import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Submission,
  SubmissionDocument,
  SubmissionStatus,
} from './schemas/submission.schema';
import {
  CreateSubmissionDto,
  UpdateSubmissionStatusDto,
  AssignSubmissionDto,
} from './dto/submission.dto';
import { BaseService } from '../common/services/base.service';
import { GovServicesService } from '../gov-services/gov-services.service';
import { SubmissionQuery, AppointmentQueryConditions } from './interfaces';

@Injectable()
export class SubmissionsService extends BaseService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    private readonly govServicesService: GovServicesService,
  ) {
    super();
  }

  // No longer needed as we'll use BaseService methods directly

  async findAll(
    status?: SubmissionStatus,
    citizenId?: string,
    serviceId?: string,
    departmentId?: string,
  ) {
    const query: SubmissionQuery = {};

    if (status) {
      query.status = status;
    }

    if (citizenId) {
      query.citizenId = citizenId;
    }

    if (serviceId) {
      query.serviceId = serviceId;
    }

    if (departmentId) {
      // Get all services for the department
      const services = await this.govServicesService.findAll(departmentId);
      const serviceIds = services.map((service) => service._id);
      query.serviceId = { $in: serviceIds };
    }

    const submissions = await this.submissionModel
      .find(query)
      .sort({ createdAt: -1 })
      .exec();
    return this.success(submissions, 'Submissions retrieved successfully');
  }

  async findById(id: Types.ObjectId | string): Promise<SubmissionDocument> {
    const submission = await this.submissionModel.findById(id).exec();
    if (!submission) {
      throw new NotFoundException(
        `Submission with ID ${id.toString()} not found`,
      );
    }
    return submission;
  }

  async create(
    createSubmissionDto: CreateSubmissionDto,
    citizenId: Types.ObjectId | string,
  ) {
    // Check if the service exists
    await this.govServicesService.findById(createSubmissionDto.serviceId);

    // Check for appointment conflicts if an appointment is included
    if (createSubmissionDto.appointment) {
      const { date, startTime, endTime, locationId } =
        createSubmissionDto.appointment;

      const appointmentQuery: AppointmentQueryConditions = {
        'appointment.date': date,
        'appointment.startTime': startTime,
        'appointment.endTime': endTime,
        'appointment.locationId': locationId,
      };

      const existingAppointment = await this.submissionModel
        .findOne(appointmentQuery)
        .exec();

      if (existingAppointment) {
        throw new ConflictException('Appointment time slot is already booked');
      }
    }

    const newSubmission = new this.submissionModel({
      ...createSubmissionDto,
      citizenId,
    });

    const submission = await newSubmission.save();
    return this.success(submission, 'Submission created successfully');
  }

  async updateStatus(
    id: Types.ObjectId | string,
    updateStatusDto: UpdateSubmissionStatusDto,
    userId: Types.ObjectId | string,
  ) {
    const submission = await this.findById(id);

    submission.status = updateStatusDto.status;

    // Add a note if provided
    if (updateStatusDto.note) {
      submission.notes.push({
        userId: new Types.ObjectId(userId),
        content: updateStatusDto.note.content,
        createdAt: new Date(),
      });
    }

    const updatedSubmission = await submission.save();
    return this.success(
      updatedSubmission,
      'Submission status updated successfully',
    );
  }

  async assignSubmission(
    id: Types.ObjectId | string,
    assignDto: AssignSubmissionDto,
    userId: Types.ObjectId | string,
  ) {
    const submission = await this.findById(id);

    submission.assignedTo = new Types.ObjectId(assignDto.assignedTo);

    // Add a note if provided
    if (assignDto.note) {
      submission.notes.push({
        userId: new Types.ObjectId(userId),
        content: assignDto.note.content,
        createdAt: new Date(),
      });
    }

    const updatedSubmission = await submission.save();
    return this.success(updatedSubmission, 'Submission assigned successfully');
  }

  async addNote(
    id: Types.ObjectId | string,
    content: string,
    userId: Types.ObjectId | string,
  ) {
    const submission = await this.findById(id);

    submission.notes.push({
      userId: new Types.ObjectId(userId),
      content,
      createdAt: new Date(),
    });

    const updatedSubmission = await submission.save();
    return this.success(updatedSubmission, 'Note added successfully');
  }

  async cancel(
    id: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    reason: string,
  ) {
    const submission = await this.findById(id);

    if (submission.status === SubmissionStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel a completed submission');
    }

    submission.status = SubmissionStatus.CANCELLED;

    submission.notes.push({
      userId: new Types.ObjectId(userId),
      content: `Submission cancelled. Reason: ${reason}`,
      createdAt: new Date(),
    });

    const updatedSubmission = await submission.save();
    return this.success(updatedSubmission, 'Submission cancelled successfully');
  }
}
