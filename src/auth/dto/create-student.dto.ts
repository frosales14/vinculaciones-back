import { IsEmail, MinLength, IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
  @IsString()
  account_number: string;
  @IsString()
  gender: string;
  @IsNumber()
  career_years: number;
  @IsString()
  contact_phone: string;
  @IsString()
  birth_date: Date;
  @IsNumber()
  inscription_year: number;
}
