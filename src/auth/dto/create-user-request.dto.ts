import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserPayload {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;
  
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*?[A-Z])/, { message: 'Password must contain at least one uppercase character' })
  @Matches(/(?=.*?[a-z])/, { message: 'Password must contain at least one lowercase character' })
  @ApiProperty()
  public password: string;
}