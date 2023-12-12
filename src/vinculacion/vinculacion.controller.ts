import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VinculacionService } from './vinculacion.service';
import { CreateVinculacionDto } from './dto/create-vinculacion.dto';
import { UpdateVinculacionDto } from './dto/update-vinculacion.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Student } from 'src/auth/entities/student.entity';

@Controller('vinculacion')
export class VinculacionController {
  constructor(private readonly vinculacionService: VinculacionService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createVinculacionDto: CreateVinculacionDto) {
    return this.vinculacionService.create(createVinculacionDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    const student = req['student'] as Student;
    const isAdmin = student.rol.includes('admin');
    console.log(isAdmin);
    return this.vinculacionService.findAll(isAdmin);
  }

  @UseGuards(AuthGuard)
  @Get('available')
  findAvailableVinculaciones() {
    return this.vinculacionService.findAvailableVinculaciones();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vinculacionService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('students/:id')
  findStudentsById(@Param('id') studentId: string) {
    return this.vinculacionService.findVinculacionesByStudentId(studentId);
  }

  @UseGuards(AuthGuard)
  @Get('students/hours/:id')
  getHoursBydID(@Param('id') studentId: string) {
    return this.vinculacionService.findTotalHoursxStudent(studentId);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/students/:id/:studentId')
  updateStudents(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
  ) {
    return this.vinculacionService.updateStudents(id, studentId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVinculacionDto: UpdateVinculacionDto,
  ) {
    return this.vinculacionService.update(id, updateVinculacionDto);
  }
}
