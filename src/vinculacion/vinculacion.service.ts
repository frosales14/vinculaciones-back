import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateVinculacionDto } from './dto/create-vinculacion.dto';
import { UpdateVinculacionDto } from './dto/update-vinculacion.dto';
import { Vinculacion } from './entities/vinculacion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VinculacionService {
  constructor(
    @InjectModel(Vinculacion.name)
    private vinculacionModel: Model<Vinculacion>,
  ) {}

  async create(createVinculacionDto: CreateVinculacionDto) {
    console.log(createVinculacionDto);
    try {
      const newVinculacion = new this.vinculacionModel({
        ...createVinculacionDto,
      });
      await newVinculacion.populate('students');

      return newVinculacion.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('is not posible to create the vinculacion');
    }
  }

  async findAll(isAdmin: boolean) {
    let vinculaciones = [];
    if (isAdmin) {
      vinculaciones = await this.vinculacionModel
        .find()
        .populate('students', 'name contact_phone');
    } else {
      vinculaciones = await this.vinculacionModel
        .find()
        .populate('students', '_id');
    }

    return vinculaciones;
  }

  async findAvailableVinculaciones() {
    const vinculaciones = await this.vinculacionModel
      .find({
        state: 'En Planeacion',
      })
      .populate('students', 'name contact_phone');

    return vinculaciones;
  }

  findOne(id: string) {
    try {
      return this.vinculacionModel
        .findById(id)
        .populate('students', '_id name contact_phone');
    } catch (error) {
      return new BadRequestException(
        `something went at the moment to get the vinculacion with id - ${id}`,
      );
    }
  }

  async findTotalHoursxStudent(id: string) {
    const vinculaciones = await this.vinculacionModel
      .find({ students: id })
      .find({ state: 'Finalizada' });

    const totalHours = vinculaciones.reduce((hours, vinculacion) => {
      return hours + vinculacion.hours;
    }, 0);

    return totalHours;
  }

  async findVinculacionesByStudentId(studentId: string) {
    const vinculaciones = await this.vinculacionModel.find({
      students: studentId,
    });

    return vinculaciones;
  }

  async updateStudents(id: string, studentId: string) {
    try {
      const vinculaciones = await this.vinculacionModel.findById(id).populate({
        path: 'students',
        select: '_id',
        match: { _id: studentId },
      });

      if (vinculaciones.students.length > 0)
        throw new BadRequestException(
          `student with id - ${studentId} already register in this vinculacion`,
        );

      return this.vinculacionModel
        .findByIdAndUpdate(
          id,
          { $addToSet: { students: studentId } },
          { new: true },
        )
        .populate('students', 'name contact_phone');
    } catch (error) {
      throw new BadRequestException(
        `error updating students in the vinculacion width id - ${id}`,
      );
    }
  }

  async update(id: string, updateVinculacionDto: UpdateVinculacionDto) {
    try {
      const vinculacion = await this.vinculacionModel.findByIdAndUpdate(
        id,
        updateVinculacionDto,
        { new: true },
      );

      return vinculacion;
    } catch (error) {
      throw new InternalServerErrorException(
        `something went wrong updating the vinculacion with id - ${id}`,
      );
    }
  }

  avilalableVinculacionesByStudent() {}
}
