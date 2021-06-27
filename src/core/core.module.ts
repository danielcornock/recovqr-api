import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './services/config/config.service';

@Module({
  providers: [ConfigService],
  imports: [
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
  ],
  exports: [ConfigService]
})
export class CoreModule {}
