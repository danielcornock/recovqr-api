import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AuthModule, CoreModule, CommonModule],
  controllers: [],
  providers: []
})
export class AppModule {}
