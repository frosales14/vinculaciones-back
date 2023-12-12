import { Student } from 'src/auth/entities/student.entity';
import { VinculacionState } from '../types/vinculacion.types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Vinculacion {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  state: VinculacionState;
  @Prop({ required: true })
  atCharge: string;
  @Prop({ required: true })
  start_date: Date;
  @Prop({ required: true })
  end_date: Date;
  @Prop({ required: true })
  hours: number;
  @Prop({ required: true })
  students_limit: number;
  @Prop({ required: true })
  budget: number;
  @Prop({ required: true })
  description: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Student.name }],
  })
  students: [Student];
}

export const VinculacionSchema = SchemaFactory.createForClass(Vinculacion);
