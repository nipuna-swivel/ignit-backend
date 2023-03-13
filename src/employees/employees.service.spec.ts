// import { Test, TestingModule } from '@nestjs/testing';
// import { EmployeesService } from './employees.service';

// describe('EmployeesService', () => {
//   let service: EmployeesService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [EmployeesService],
//     }).compile();

//     service = module.get<EmployeesService>(EmployeesService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';
import { EmployeeSchema } from '../schemas/employee.schema';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let model: Model<EmployeesModule>;

  const employeeDocument = {
    _id: '611f3192e17b792a06b004bf',
    fname: 'example first name',
    lname: 'example last name',
    email: 'example email address',
    contactNum: 'example contact number',
    gender: 'example gender',
    photoURL: 'example photo URL',
  } as EmployeeSchema;

  const exampleCreateDTO = {
    fname: 'example first name',
    lname: 'example last name',
    email: 'example email address',
    contactNum: 'example contact number',
    gender: 'example gender',
    photoURL: 'example photo URL',
  } as CreateEmployeeDto;

  const exampleUpdateDTO = {
    fname: 'example first name',
    lname: 'example last name',
    email: 'example email address',
    contactNum: 'example contact number',
    gender: 'example gender',
    photoURL: 'example photo URL',
  } as UpdateEmployeeDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getModelToken('Example'),
          useValue: {
            new: jest.fn().mockResolvedValue(employeeDocument),
            constructor: jest.fn().mockResolvedValue(employeeDocument),
            findOne: jest.fn().mockResolvedValue(employeeDocument),
            find: jest.fn().mockResolvedValue([employeeDocument]),
            create: jest.fn().mockResolvedValue(employeeDocument),
            findByIdAndUpdate: jest.fn().mockResolvedValue(employeeDocument),
            findByIdAndRemove: jest.fn().mockResolvedValue(employeeDocument),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    model = module.get<Model<EmployeeSchema>>(getModelToken('Example'));
  });

  describe('findAll', () => {
    it('should return an array of example documents', async () => {
      const result = await service.findAll();
      expect(result).toEqual([employeeDocument]);
    });
  });

  describe('findOne', () => {
    it('should return an example document', async () => {
      const result = await service.findOne('611f3192e17b792a06b004bf');
      expect(result).toEqual(employeeDocument);
    });
  });

  describe('create', () => {
    it('should create and return an example document', async () => {
      const result = await service.create(exampleCreateDTO);
      expect(model.create).toHaveBeenCalledWith(exampleCreateDTO);
      expect(result).toEqual(employeeDocument);
    });
  });

  describe('update', () => {
    it('should update and return an example document', async () => {
      const result = await service.update(
        '611f3192e17b792a06b004bf',
        exampleUpdateDTO,
      );
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '611f3192e17b792a06b004bf',
        exampleUpdateDTO,
        { new: true },
      );
      expect(result).toEqual(employeeDocument);
    });
  });

  describe('delete', () => {
    it('should delete and return an example document', async () => {
      const result = await service.remove('611f3192e17b792a06b004bf');
      expect(model.findByIdAndRemove).toHaveBeenCalledWith(
        '611f3192e17b792a06b004bf',
      );
      expect(result).toEqual(employeeDocument);
    });
  });
});
