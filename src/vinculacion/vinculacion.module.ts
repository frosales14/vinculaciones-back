import { Module } from '@nestjs/common';
import { VinculacionService } from './vinculacion.service';
import { VinculacionController } from './vinculacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Vinculacion, VinculacionSchema } from './entities/vinculacion.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { Student, StudentSchema } from 'src/auth/entities/student.entity';

@Module({
  controllers: [VinculacionController],
  providers: [VinculacionService, AuthService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Vinculacion.name,
        schema: VinculacionSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ],
})
export class VinculacionModule {}
