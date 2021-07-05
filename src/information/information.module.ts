import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InformationController } from './controllers/information/information.controller';
import { InformationEntity, InformationSchema } from './entities/information.entity';
import { InformationRepoService } from './services/information-repo/information-repo.service';
import { QrCodeService } from './services/qr-code/qr-code.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InformationEntity.name, schema: InformationSchema }
    ])
  ],
  providers: [
    InformationRepoService,
    QrCodeService
  ],
  controllers: [InformationController]
})
export class InformationModule {}
