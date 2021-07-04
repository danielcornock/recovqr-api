import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserId } from 'src/auth/decorators/user-id.decorator';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { InformationPayload } from 'src/information/dto/information-payload.dto';
import { Information } from 'src/information/entities/information.entity';
import { InformationRepoService } from 'src/information/services/information-repo/information-repo.service';

@UseGuards(AuthGuard)
@Controller('information')
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
