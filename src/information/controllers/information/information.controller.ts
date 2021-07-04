import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthRequired } from 'src/auth/decorators/auth-required.decorator';
import { UserId } from 'src/auth/decorators/user-id.decorator';
import { InformationPayload } from 'src/information/dto/information-payload.dto';
import { Information } from 'src/information/entities/information.entity';
import { InformationRepoService } from 'src/information/services/information-repo/information-repo.service';

@Controller('information')
@AuthRequired()
export class InformationController {
  constructor(
    private infoRepo: InformationRepoService
  ) {}
    
  @Post()
  public async createInformationEntry(
    @Body() body: InformationPayload, @UserId() userId: string
  ): Promise<Information> {
    const information = await this.infoRepo.createOrUpdate(userId, body);

    return information;
  }

  @Get()
  public async getInformationByUser(@UserId() userId: string): Promise<Information> {
    const information = this.infoRepo.fetchInformationByUserId(userId);

    return information;
  }
}
