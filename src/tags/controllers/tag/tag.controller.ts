import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthRequired } from 'src/auth/decorators/auth-required.decorator';
import { UserId } from 'src/auth/decorators/user-id.decorator';
import { CreateTagPayload } from 'src/tags/dto/create-tag-payload.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { LocationLookupService } from 'src/tags/services/location-lookup/location-lookup.service';
import { TagRepoService } from 'src/tags/services/tag-repo/tag-repo.service';

@Controller('tags')
export class TagController {
  constructor(
    private tagRepo: TagRepoService,
    private locationLookupService: LocationLookupService
  ) {}

  @Post(':userId')
  public async postTag(
    @Param('userId') userId: string,
      @Req() request: Request,
      @Body() body: CreateTagPayload
  ): Promise<Tag> {
    const ipAddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress;
    // console.log(ipAddress);
    console.log(request.headers['x-forwarded-for']);
    console.log(request.connection.remoteAddress);
    console.log(request.socket.address);
    console.log(request.socket.remoteAddress);
    console.log(request.ip);
    console.log(ipAddress);
    // console.log(request.socket.remoteAddress);
    const locationInformation = await this.locationLookupService.getLocationData(
      ipAddress as string,
      body
    );

    return this.tagRepo.generateTag({
      userId,
      ipAddress: ipAddress as string,
      ...locationInformation
    });
  }

  @Get()
  @AuthRequired()
  public async getAllTags(@UserId() userId: string): Promise<Tag[]> {
    return this.tagRepo.getAllTags(userId);
  }

  @Delete(':id')
  @AuthRequired()
  public deleteTag(@UserId() userId: string, @Param('id') tagId: string): Promise<void> {
    return this.tagRepo.deleteTag({ userId, tagId });
  }
}
