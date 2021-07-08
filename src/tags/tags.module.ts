import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './controllers/tag/tag.controller';
import { TagEntity, TagSchema } from './entities/tag.entity';
import { LocationLookupService } from './services/location-lookup/location-lookup.service';
import { TagRepoService } from './services/tag-repo/tag-repo.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: TagEntity.name, schema: TagSchema }
    ])
  ],
  providers: [TagRepoService, LocationLookupService],
  controllers: [TagController]
})
export class TagsModule {}
