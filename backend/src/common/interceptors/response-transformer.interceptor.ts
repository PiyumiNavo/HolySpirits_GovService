import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Response Transformer Interceptor
 *
 * This interceptor transforms all responses to follow a standard format:
 * { status, message, data }
 */
@Injectable()
export class ResponseTransformerInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const statusCode = response.statusCode || HttpStatus.OK;

    return next.handle().pipe(
      map((data) => {
        // If response is already formatted, return it as is
        if (
          data &&
          data.hasOwnProperty('status') &&
          data.hasOwnProperty('message') &&
          data.hasOwnProperty('data')
        ) {
          return data;
        }

        // Determine message based on status code
        let message = 'Success';
        if (statusCode >= 400) {
          message = 'Error';
        }

        // Format response
        return {
          status: statusCode,
          message: message,
          data: data || null,
        };
      }),
    );
  }
}
