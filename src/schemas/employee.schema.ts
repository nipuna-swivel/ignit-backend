import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ required: true })
  fname: string;
  @Prop({ required: true })
  lname: string;
  @Prop({ required: true })
  contactNum: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  gender: string;
  @Prop()
  photoUrl: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
