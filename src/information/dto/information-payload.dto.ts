import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InformationPayload {
  @IsString()
  @ApiPropertyOptional()
  public name?: string;

  @IsString()
  @ApiPropertyOptional()
  public email?: string;

  @IsString()
  @ApiPropertyOptional()
  public country?: string;

  @IsString()
  @ApiPropertyOptional()
  public telephone?: string;

  @IsString()
  @ApiPropertyOptional()
  public message?: string;
}