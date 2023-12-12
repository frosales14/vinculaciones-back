import { CreateStudentDto } from './create-student.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAuthDto extends PartialType(CreateStudentDto) {}
