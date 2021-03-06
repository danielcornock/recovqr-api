import { Logger, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomValidationPipe } from './pipes/custom-validation/custom-validation.pipe';
import { ConfigService } from './services/config/config.service';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    }
  ],
  imports: [
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        Logger.log(
          `Connecting to ${ConfigService.getEnvironment()} database`,
          'CoreModule'
        );

        return {
          uri: ConfigService.getDatabaseUri()
        };
      }
    })
  ]
})
export class CoreModule {}
