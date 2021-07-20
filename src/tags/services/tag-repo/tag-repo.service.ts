import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepoService } from 'src/core/abstract/base-repo.service';
import { Tag, TagEntity } from 'src/tags/entities/tag.entity';
import { NormalisedLocationData } from 'src/tags/interfaces/normalised-location-data.interface';

@Injectable()
export class TagRepoService extends BaseRepoService<TagEntity> {
  constructor(@InjectModel(TagEntity.name) tagRepo: Model<TagEntity>) {
    super(tagRepo);
  }

  public async generateTag(data: NormalisedLocationData & { userId: string, ipAddress: string }): Promise<Tag> {
    const tag = await this.repo.create(data);

    return tag.toObject();
  }

  public async deleteTag({ userId, tagId }: { userId: string, tagId: string }): Promise<void> {
    await this.repo.deleteOne({ userId, _id: tagId });
  }
}
