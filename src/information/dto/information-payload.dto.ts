import { IsString } from 'class-validator';

export class InformationPayload {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public country: string;

  @IsString()
  public telephone: string;

  @IsString()
  public message: string;
}