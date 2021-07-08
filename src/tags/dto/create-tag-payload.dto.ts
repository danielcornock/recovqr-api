import { IsOptional } from 'class-validator';

export class CreateTagPayload {
  @IsOptional()
  public latitude?: string;

  @IsOptional()
  public longitude?: string;
}