import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InformationController } from './controllers/information/information.controller';
import { InformationEntity, InformationSchema } from './entities/information.entity';
import { InformationRepoService } from './services/information-repo/information-repo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InformationEntity.name, schema: InformationSchema }
    ])
  ],
  providers: [
    InformationRepoService
  ],
  controllers: [InformationController]
})
export class InformationModule {}
