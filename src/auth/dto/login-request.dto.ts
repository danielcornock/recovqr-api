import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginPayload {
  @IsString()
  @ApiProperty()
  public email: string;

  @IsString()
  @ApiProperty()
  public password: string;
}