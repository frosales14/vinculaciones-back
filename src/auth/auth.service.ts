import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Student } from './entities/student.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterStudentDto } from './dto';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
    private jwtService: JwtService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const { password, ...studentData } = createStudentDto;

      const newStudent = new this.studentModel({
        password: bcryptjs.hashSync(password, 10),
        ...studentData,
      });

      await newStudent.save();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...user } = newStudent.toJSON();

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `${createStudentDto.email} is already register`,
        );
      }
      throw new InternalServerErrorException('something went wrong');
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const student = await this.studentModel.findOne({ email });

    if (!student) {
      console.log('no existe');
      throw new UnauthorizedException('invalid credentials');
    }

    if (!bcryptjs.compareSync(password, student.password)) {
      console.log('password mala');
      throw new UnauthorizedException('invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = student.toJSON();

    return {
      student: rest,
      token: this.getJwtToken({ id: student.id }),
    };
  }

  async register(
    registerStudentDto: RegisterStudentDto,
  ): Promise<LoginResponse> {
    const student = await this.create(registerStudentDto);

    return {
      student,
      token: this.getJwtToken({ id: student._id }),
    };
  }

  async findById(id: string) {
    const student = await this.studentModel.findById(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = student.toJSON();
    return rest;
  }

  async findAll(): Promise<Student[]> {
    return await this.studentModel.find();
  }

  // async findOne(id: string) {
  //   try {
  //     const estudent = await this.studentModel.findById(id);
  //   } catch (error) {

  //   }
  // }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
