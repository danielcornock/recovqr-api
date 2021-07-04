import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth/auth.guard';

export const AuthGuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard
};