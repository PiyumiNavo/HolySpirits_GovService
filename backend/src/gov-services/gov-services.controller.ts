import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { GovServicesService } from './gov-services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceResponseDto } from './dto/service-response.dto';
import { JwtGuard } from '../common/guards/jwt/jwt.guard';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { Types } from 'mongoose';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Government Services')
@Controller('gov-services')
export class GovServicesController {
  constructor(private readonly govServicesService: GovServicesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all services or filter by department ID' })
  @ApiQuery({
    name: 'departmentId',
    required: false,
    description: 'Filter services by department ID',
  })
  @ApiQuery({
    name: 'published',
    required: false,
    description: 'Filter for only published services',
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all services or filtered by department',
    type: [ServiceResponseDto],
  })
  async findAll(
    @Query('departmentId') departmentId?: string,
    @Query('published') published?: string,
  ) {
    let services;
    if (published === 'true') {
      services =
        await this.govServicesService.getPublishedServices(departmentId);
    } else {
      services = await this.govServicesService.findAll(departmentId);
    }
    return this.govServicesService.success(services);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get service by ID' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the service',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async findOne(@Param('id') id: string) {
    const service = await this.govServicesService.findById(
      new Types.ObjectId(id),
    );
    return this.govServicesService.success(service);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({
    status: 201,
    description: 'Service successfully created',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Request() req: RequestWithUser,
  ) {
    const createdService = await this.govServicesService.create(
      createServiceDto,
      req.user._id,
    );
    return this.govServicesService.success(createdService);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service successfully updated',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: CreateServiceDto,
  ) {
    const updatedService = await this.govServicesService.update(
      new Types.ObjectId(id),
      updateServiceDto,
    );
    return this.govServicesService.success(updatedService);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service successfully deleted',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async remove(@Param('id') id: string) {
    const deletedService = await this.govServicesService.delete(
      new Types.ObjectId(id),
    );
    return this.govServicesService.success(deletedService);
  }

  @Put(':id/publish')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service successfully published',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async publishService(@Param('id') id: string) {
    const publishedService = await this.govServicesService.publishService(
      new Types.ObjectId(id),
    );
    return this.govServicesService.success(publishedService);
  }

  @Put(':id/unpublish')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unpublish a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service successfully unpublished',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  async unpublishService(@Param('id') id: string) {
    const unpublishedService = await this.govServicesService.unpublishService(
      new Types.ObjectId(id),
    );
    return this.govServicesService.success(unpublishedService);
  }
}
