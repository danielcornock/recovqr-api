import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateTagPayload {
  @IsOptional()
  @ApiPropertyOptional()
  public latitude?: string;

  @IsOptional()
  @ApiPropertyOptional()
  public longitude?: string;
}