import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateVinculacionDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  state: string;
  @IsString()
  atCharge: string;
  @IsString()
  start_date: string;
  @IsString()
  end_date: string;
  @IsNumber()
  hours: number;
  @IsNumber()
  students_limit: number;
  @IsNumber()
  budget: number;
  @IsString()
  description: string;
  @IsArray()
  students?: string[];
}
