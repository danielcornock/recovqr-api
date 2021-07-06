import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagEntity, TagSchema } from './entities/tag.entity';
import { IpLookupService } from './services/ip-lookup/ip-lookup.service';
import { TagRepoService } from './services/tag-repo/tag-repo.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: TagEntity.name, schema: TagSchema }
    ])
  ],
  providers: [TagRepoService, IpLookupService],
  controllers: []
})
export class TagsModule {}
