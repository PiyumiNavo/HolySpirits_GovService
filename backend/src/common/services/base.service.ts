import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Base service with helper methods for consistent API responses
 */
export abstract class BaseService {
  /**
   * Create a successful response object
   * @param data The data to include in the response
   * @param message Custom success message
   * @param status HTTP status code (default: 200 OK)
   * @returns Standardized API response
   */
  protected success<T>(
    data?: T,
    message = 'Success',
    status = HttpStatus.OK,
  ): ApiResponse<T> {
    return {
      status,
      message,
      data,
    };
  }

  /**
   * Create an error response object
   * @param message Error message
   * @param status HTTP status code (default: 400 Bad Request)
   * @param data Optional data to include
   * @returns Standardized API response
   */
  protected error<T>(
    message = 'Error occurred',
    status = HttpStatus.BAD_REQUEST,
    data?: T,
  ): ApiResponse<T> {
    return {
      status,
      message,
      data,
    };
  }

  /**
   * Create a paginated response object
   * @param data Array of items
   * @param total Total count of items
   * @param page Current page number
   * @param limit Items per page
   * @param message Success message
   * @returns Standardized paginated API response
   */
  protected paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Success',
  ) {
    const totalPages = Math.ceil(total / limit);
    return {
      status: HttpStatus.OK,
      message,
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  }
}
