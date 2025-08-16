import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationResponseDto } from './dto/location-response.dto';
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

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all locations or filter by department ID' })
  @ApiQuery({
    name: 'departmentId',
    required: false,
    description: 'Filter locations by department ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all locations or filtered by department',
    type: [LocationResponseDto],
  })
  async findAll(@Query('departmentId') departmentId?: string) {
    let locations;
    if (departmentId) {
      locations = await this.locationsService.findByDepartmentId(departmentId);
    } else {
      locations = await this.locationsService.findAll();
    }
    return this.locationsService.success(locations);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by ID' })
  @ApiParam({ name: 'id', description: 'Location ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the location',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async findOne(@Param('id') id: string) {
    const location = await this.locationsService.findById(
      new Types.ObjectId(id),
    );
    return this.locationsService.success(location);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({
    status: 201,
    description: 'Location successfully created',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createLocationDto: CreateLocationDto) {
    const createdLocation =
      await this.locationsService.create(createLocationDto);
    return this.locationsService.success(createdLocation);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a location' })
  @ApiParam({ name: 'id', description: 'Location ID' })
  @ApiResponse({
    status: 200,
    description: 'Location successfully updated',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: CreateLocationDto,
  ) {
    const updatedLocation = await this.locationsService.update(
      new Types.ObjectId(id),
      updateLocationDto,
    );
    return this.locationsService.success(updatedLocation);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.DEPT_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a location' })
  @ApiParam({ name: 'id', description: 'Location ID' })
  @ApiResponse({
    status: 200,
    description: 'Location successfully deleted',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async remove(@Param('id') id: string) {
    const deletedLocation = await this.locationsService.delete(
      new Types.ObjectId(id),
    );
    return this.locationsService.success(deletedLocation);
  }
}
