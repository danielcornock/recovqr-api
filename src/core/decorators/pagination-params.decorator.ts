import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationOptions } from '../interfaces/pagination-options.interface';

export const PaginationParams = createParamDecorator(
  (_data, ctx: ExecutionContext): PaginationOptions => {
    const requestParams = ctx.switchToHttp().getRequest().query;

    return {
      pageSize: (requestParams.pageSize && +requestParams.pageSize) ?? 10,
      page: (requestParams.page && +requestParams.page) ?? 1,
      search: requestParams.search ?? ''
    };
  }
);
