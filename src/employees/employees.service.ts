import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(CreateEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const createdEmployee = new this.employeeModel(CreateEmployeeDto);
      return createdEmployee.save();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async findAll() {
    try {
      return this.employeeModel.find();
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async findOne(id: string) {
    try {
      return this.employeeModel.findById(id);
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return this.employeeModel.updateOne(
        { _id: id },
        { $set: { ...updateEmployeeDto } },
      );
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }

  async remove(id: string) {
    try {
      return this.employeeModel.deleteOne({ _id: id });
    } catch (error) {
      throw new BadRequestException(error.messege);
    }
  }
}
