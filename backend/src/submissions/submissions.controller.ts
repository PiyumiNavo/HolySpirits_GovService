import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SubmissionsService } from './submissions.service';
import {
  CreateSubmissionDto,
  UpdateSubmissionStatusDto,
  AssignSubmissionDto,
  NoteDto,
  CancelSubmissionDto,
} from './dto/submission.dto';
import { SubmissionResponseDto } from './dto/submission-response.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Types } from 'mongoose';
import { SubmissionStatus } from './schemas/submission.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-objectid.pipe';
import { JwtGuard } from 'src/common/guards/jwt/jwt.guard';

@ApiTags('submissions')
@Controller('submissions')
@UseGuards(JwtGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all submissions with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns all submissions matching the filters',
    type: [SubmissionResponseDto],
  })
  @ApiQuery({ name: 'status', enum: SubmissionStatus, required: false })
  @ApiQuery({ name: 'citizenId', required: false })
  @ApiQuery({ name: 'serviceId', required: false })
  @ApiQuery({ name: 'departmentId', required: false })
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN, UserRole.DEPT_STAFF)
  async findAll(
    @Query('status') status?: SubmissionStatus,
    @Query('citizenId') citizenId?: string,
    @Query('serviceId') serviceId?: string,
    @Query('departmentId') departmentId?: string,
  ) {
    const submissions = await this.submissionsService.findAll(
      status,
      citizenId,
      serviceId,
      departmentId,
    );
    return this.submissionsService.transformResponse(
      true,
      'Submissions retrieved successfully',
      submissions,
    );
  }

  @Get('my-submissions')
  @ApiOperation({ summary: 'Get all submissions for the current citizen' })
  @ApiResponse({
    status: 200,
    description: 'Returns all submissions for the current citizen',
    type: [SubmissionResponseDto],
  })
  @Roles(UserRole.CITIZEN)
  async findMyCitizenSubmissions(@GetUser('_id') userId: string) {
    const submissions = await this.submissionsService.findAll(
      undefined,
      userId,
      undefined,
      undefined,
    );
    return this.submissionsService.transformResponse(
      true,
      'Your submissions retrieved successfully',
      submissions,
    );
  }

  @Get('assigned')
  @ApiOperation({
    summary: 'Get all submissions assigned to the current staff member',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all submissions assigned to the staff member',
    type: [SubmissionResponseDto],
  })
  @Roles(UserRole.DEPT_STAFF)
  async findAssignedSubmissions(@GetUser('_id') userId: string) {
    const submissions = await this.submissionsService.findAll(
      undefined,
      undefined,
      undefined,
      undefined,
    );
    // Filter assigned submissions in memory
    const assignedSubmissions = submissions.filter(
      (submission) => submission.assignedTo?.toString() === userId,
    );
    return this.submissionsService.transformResponse(
      true,
      'Your assigned submissions retrieved successfully',
      assignedSubmissions,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a submission by ID' })
  @ApiParam({ name: 'id', description: 'The submission ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the submission',
    type: SubmissionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const submission = await this.submissionsService.findById(id);
    return this.submissionsService.transformResponse(
      true,
      'Submission retrieved successfully',
      submission,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new submission' })
  @ApiResponse({
    status: 201,
    description: 'The submission has been successfully created',
    type: SubmissionResponseDto,
  })
  @Roles(UserRole.CITIZEN)
  async create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @GetUser('_id') citizenId: string,
  ) {
    const submission = await this.submissionsService.create(
      createSubmissionDto,
      new Types.ObjectId(citizenId),
    );
    return this.submissionsService.transformResponse(
      true,
      'Submission created successfully',
      submission,
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update submission status' })
  @ApiParam({ name: 'id', description: 'The submission ID' })
  @ApiResponse({
    status: 200,
    description: 'The submission status has been updated',
    type: SubmissionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN, UserRole.DEPT_STAFF)
  async updateStatus(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateStatusDto: UpdateSubmissionStatusDto,
    @GetUser('_id') userId: string,
  ) {
    const submission = await this.submissionsService.updateStatus(
      id,
      updateStatusDto,
      new Types.ObjectId(userId),
    );
    return this.submissionsService.transformResponse(
      true,
      'Submission status updated successfully',
      submission,
    );
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign submission to a staff member' })
  @ApiParam({ name: 'id', description: 'The submission ID' })
  @ApiResponse({
    status: 200,
    description: 'The submission has been assigned',
    type: SubmissionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  async assignSubmission(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() assignDto: AssignSubmissionDto,
    @GetUser('_id') userId: string,
  ) {
    const submission = await this.submissionsService.assignSubmission(
      id,
      assignDto,
      new Types.ObjectId(userId),
    );
    return this.submissionsService.transformResponse(
      true,
      'Submission assigned successfully',
      submission,
    );
  }

  @Post(':id/notes')
  @ApiOperation({ summary: 'Add a note to a submission' })
  @ApiParam({ name: 'id', description: 'The submission ID' })
  @ApiResponse({
    status: 200,
    description: 'The note has been added',
    type: SubmissionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN, UserRole.DEPT_STAFF)
  async addNote(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() addNoteDto: NoteDto,
    @GetUser('_id') userId: string,
  ) {
    const submission = await this.submissionsService.addNote(
      id,
      addNoteDto.content,
      new Types.ObjectId(userId),
    );
    return this.submissionsService.transformResponse(
      true,
      'Note added successfully',
      submission,
    );
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a submission' })
  @ApiParam({ name: 'id', description: 'The submission ID' })
  @ApiResponse({
    status: 200,
    description: 'The submission has been cancelled',
    type: SubmissionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  @ApiResponse({
    status: 400,
    description: 'Cannot cancel a completed submission',
  })
  async cancelSubmission(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() cancelDto: CancelSubmissionDto,
    @GetUser('_id') userId: string,
  ) {
    const submission = await this.submissionsService.cancel(
      id,
      new Types.ObjectId(userId),
      cancelDto.reason,
    );
    return this.submissionsService.transformResponse(
      true,
      'Submission cancelled successfully',
      submission,
    );
  }
}
