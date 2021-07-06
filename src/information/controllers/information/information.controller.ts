import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AuthRequired } from 'src/auth/decorators/auth-required.decorator';
import { UserId } from 'src/auth/decorators/user-id.decorator';
import { InformationPayload } from 'src/information/dto/information-payload.dto';
import { Information } from 'src/information/entities/information.entity';
import { QrCodeResponse } from 'src/information/interfaces/qr-code-response.interface';
import { InformationRepoService } from 'src/information/services/information-repo/information-repo.service';
import { QrCodeService } from 'src/information/services/qr-code/qr-code.service';

@Controller('information')
export class InformationController {
  constructor(
    private infoRepo: InformationRepoService,
    private qrCodeService: QrCodeService
  ) {}
    
  @Post()
  @AuthRequired()
  public async createInformationEntry(
    @Body() body: InformationPayload, @UserId() userId: string
  ): Promise<Information> {
    return this.infoRepo.createOrUpdate(userId, body);
  }

  @Get()
  @AuthRequired()
  public async getInformationByUser(@UserId() userId: string): Promise<Information> {
    return this.infoRepo.fetchInformationByUserId(userId);
  }

  @Get('qr-code')
  @AuthRequired()
  public async getOwnQrCode(@Headers('origin') origin: string, @UserId() userId: string): Promise<QrCodeResponse> {
    const qrCode = await this.qrCodeService.generateUserQrCode({ origin, userId });

    return { qrCode };
  }

  @Get(':userId')
  public async getPublicInformation(@Param('userId') userId: string): Promise<Information> {
    return this.infoRepo.fetchInformationByUserId(userId);
  }
}
