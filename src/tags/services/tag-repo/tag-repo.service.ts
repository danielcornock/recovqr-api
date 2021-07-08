import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagEntity } from 'src/tags/entities/tag.entity';
import { NormalisedLocationData } from 'src/tags/interfaces/normalised-location-data.interface';

@Injectable()
export class TagRepoService {
  constructor(@InjectModel(TagEntity.name) private tagRepo: Model<TagEntity>) {}

  public async getAllTags(userId: string): Promise<Tag[]> {
    const tag = await this.tagRepo.find({ userId });

    return tag.map((tag) => tag.toObject());
  }

  public async generateTag(data: NormalisedLocationData & { userId: string, ipAddress: string }): Promise<Tag> {
    const tag = await this.tagRepo.create(data);

    return tag.toObject();
  }
}
