import { createParamDecorator } from '@nestjs/common';
import { Tasklist } from './task-list.entity';

export const GetTasklist = createParamDecorator((data, ctx): Tasklist => {
  const req = ctx.switchToHttp().getRequest();
  return req.tasklist;
});
