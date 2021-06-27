import { IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;
}