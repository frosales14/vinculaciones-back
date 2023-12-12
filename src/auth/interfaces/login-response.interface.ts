import { Student } from '../entities/student.entity';

export interface LoginResponse {
  student: Student;
  token: string;
}
