import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Query,
  HttpStatus,
  Req,
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
import { Types } from 'mongoose';
import { SubmissionStatus } from './schemas/submission.schema';
import { ParseObjectIdPipe } from '../common/pipes/parse-objectid.pipe';
import { JwtGuard } from 'src/common/guards/jwt/jwt.guard';
import { type RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

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
    return this.submissionsService.findAll(
      status,
      citizenId,
      serviceId,
      departmentId,
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
  async findMyCitizenSubmissions(@Req() req: RequestWithUser) {
    return this.submissionsService.findAll(
      undefined,
      req.user._id,
      undefined,
      undefined,
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
  async findAssignedSubmissions(@Req() req: RequestWithUser) {
    // We need to modify the service to handle this case properly
    const submissions = await this.submissionsService.findAll(
      undefined,
      undefined,
      undefined,
      undefined,
    );

    // Since the service now returns an ApiResponse, we need to access the data property
    const submissionsData = submissions.data || [];

    // Filter assigned submissions in memory
    const assignedSubmissions = submissionsData.filter(
      (submission) =>
        submission.assignedTo?.toString() === req.user._id.toString(),
    );

    // Return using the success format from BaseService
    return {
      status: HttpStatus.OK,
      message: 'Your assigned submissions retrieved successfully',
      data: assignedSubmissions,
    };
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
    return this.submissionsService.findById(id);
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
    @Req() req: RequestWithUser,
  ) {
    return this.submissionsService.create(
      createSubmissionDto,
      new Types.ObjectId(req.user._id),
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
    @Req() req: RequestWithUser,
  ) {
    return this.submissionsService.updateStatus(
      id,
      updateStatusDto,
      new Types.ObjectId(req.user._id),
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
    @Req() req: RequestWithUser,
  ) {
    return this.submissionsService.assignSubmission(
      id,
      assignDto,
      new Types.ObjectId(req.user._id),
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
    @Req() req: RequestWithUser,
  ) {
    return this.submissionsService.addNote(
      id,
      addNoteDto.content,
      new Types.ObjectId(req.user._id),
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
    @Req() req: RequestWithUser,
  ) {
    return this.submissionsService.cancel(
      id,
      new Types.ObjectId(req.user._id),
      cancelDto.reason,
    );
  }
}
