import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class InformationPayload {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public country?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public telephone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public message?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  public twitter?: string;
}