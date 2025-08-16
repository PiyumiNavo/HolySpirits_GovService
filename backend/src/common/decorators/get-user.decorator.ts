import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Gets the user from the request object
 * @param data Property to extract from the user object (optional)
 * @param context Execution context
 * @returns The user object or a specific property if data is provided
 */
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
