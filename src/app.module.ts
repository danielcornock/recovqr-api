import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { InformationModule } from './information/information.module';

@Module({
  imports: [AuthModule, CoreModule, CommonModule, InformationModule]
})
export class AppModule {}
