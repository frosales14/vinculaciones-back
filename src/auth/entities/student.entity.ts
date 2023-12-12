import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Student {
  _id?: string;
  @Prop({ required: true })
  account_number: string;
  @Prop({ required: true })
  name: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ minlength: 6, required: true })
  password?: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ type: [String], default: ['student'] })
  rol: string[];
  @Prop({ default: 0 })
  acumulate_hours: number;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  career_years: number;
  @Prop({ required: true })
  contact_phone: string;
  @Prop({ required: true })
  birth_date: Date;
  @Prop({ required: true })
  inscription_year: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
