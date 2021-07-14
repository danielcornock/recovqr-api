import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthRequired } from 'src/auth/decorators/auth-required.decorator';
import { UserId } from 'src/auth/decorators/user-id.decorator';
import { CreateTagPayload } from 'src/tags/dto/create-tag-payload.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { LocationLookupService } from 'src/tags/services/location-lookup/location-lookup.service';
import { TagRepoService } from 'src/tags/services/tag-repo/tag-repo.service';

@Controller('tags')
@ApiTags('Tags')
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
    const ipAddress = request.headers['x-forwarded-for'] as string;

    const locationInformation = await this.locationLookupService.getLocationData(
      ipAddress,
      body
    );

    return this.tagRepo.generateTag({
      userId,
      ipAddress,
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
