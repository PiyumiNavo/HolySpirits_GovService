# API Response Structure Guide

## Standard Response Format

All API responses should follow this standard format:

```typescript
{
  "status": number,   // HTTP status code
  "message": string,  // Human-readable message
  "data": any         // Response payload (can be null)
}
```

## How to Use the Response Structure

### 1. Using the BaseService

For service classes, extend the BaseService to get helper methods:

```typescript
import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class YourService extends BaseService {
  constructor() {
    super();
  }
  
  findAll() {
    const items = [/* your data */];
    return this.success(items, 'Items retrieved successfully');
  }
  
  findOne(id: string) {
    try {
      const item = /* find item logic */;
      return this.success(item, 'Item found');
    } catch (error) {
      return this.error('Item not found', HttpStatus.NOT_FOUND);
    }
  }
  
  // For paginated responses
  findPaginated(page: number, limit: number) {
    const items = [/* paginated data */];
    const total = /* total count */;
    return this.paginated(items, total, page, limit, 'Items retrieved successfully');
  }
}
```

### 2. Direct Controller Responses

In controllers, you can return the response directly:

```typescript
@Controller('items')
export class ItemsController {
  @Get()
  findAll() {
    // The response will be transformed by the interceptor
    return itemsArray;
  }
  
  // Or manually format the response
  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      status: HttpStatus.OK,
      message: 'Item found',
      data: item,
    };
  }
}
```

### 3. Global Response Transformation

All responses are automatically transformed by the ResponseTransformerInterceptor to follow the standard format.

## Swagger Documentation

For Swagger documentation, use the ApiResponseDto:

```typescript
@ApiResponse({
  status: 200,
  description: 'Success',
  type: ApiResponseDto,
})
```

For specific response types:

```typescript
@ApiResponse({
  status: 200,
  description: 'User list retrieved successfully',
  schema: {
    allOf: [
      { $ref: getSchemaPath(ApiResponseDto) },
      {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(UserDto) },
          },
        },
      },
    ],
  },
})
```

## Error Handling

For error responses, use the error method from BaseService:

```typescript
try {
  // Your logic
} catch (error) {
  return this.error('Error message', HttpStatus.BAD_REQUEST);
}
```

## Testing

When writing tests, expect all responses to follow the standard format:

```typescript
expect(response.body).toHaveProperty('status');
expect(response.body).toHaveProperty('message');
expect(response.body).toHaveProperty('data');
```
