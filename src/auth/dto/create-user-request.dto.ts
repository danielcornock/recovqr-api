import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  public name: string;
  
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*?[A-Z])/, { message: 'Password must contain at least one uppercase character' })
  @Matches(/(?=.*?[a-z])/, { message: 'Password must contain at least one lowercase character' })
  public password: string;
}