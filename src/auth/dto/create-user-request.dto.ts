import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  public name: string;
  
  @IsString()
  @IsNotEmpty()
  public email: string;
  
  @IsString()
  @IsNotEmpty()
  public password: string;
}