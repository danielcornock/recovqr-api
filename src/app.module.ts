import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { InformationModule } from './information/information.module';

@Module({
  imports: [AuthModule, CoreModule, InformationModule]
})
export class AppModule {}
