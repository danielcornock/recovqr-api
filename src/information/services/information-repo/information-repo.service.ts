import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InformationPayload } from 'src/information/dto/information-payload.dto';
import { Information, InformationEntity } from 'src/information/entities/information.entity';

@Injectable()
export class InformationRepoService {
  constructor(
    @InjectModel(InformationEntity.name) private infoRepo: Model<InformationEntity>
  ) {}

  public async createOrUpdate(userId: string, data: InformationPayload): Promise<Information> {
    const existingInformation = await this.infoRepo.findOne({ userId });

    let created: InformationEntity;

    if (existingInformation) {
      created = await this.infoRepo.findByIdAndUpdate(existingInformation._id, data, { new: true });
    } else {
      created = await this.infoRepo.create({
        userId,
        ...data
      });
    }

    return created.toObject();
  }

  public async fetchInformationByUserId(userId: string): Promise<Information> {
    const information = await this.infoRepo.findOne({ userId });

    return information.toObject();
  }
}
