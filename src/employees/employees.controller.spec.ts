import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';
import { NotFoundException } from '@nestjs/common';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const mockUsers = [
    {
      _id: '640071k2fx9566hf5fa595a9',
      fname: 'Thanuja',
      lname: 'Perera',
      email: 'thanu@gmail.com',
      contactNum: '0112345654',
      gender: 'F',
      photoURL: 'http://',
    },
    {
      _id: '740071k2fa9566hf5fa595am',
      fname: 'Amal',
      lname: 'Perera',
      email: 'amal@gmail.com',
      contactNum: '0119345654',
      gender: 'M',
      photoURL: 'http://',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a employee', async () => {
      const user = mockUsers[0];
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(user._id);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const id = '740071k2fa9566hf5fa595am';
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should return the created user', async () => {
      const userDto: CreateEmployeeDto = {
        fname: 'Bob',
        lname: 'Male',
        email: 'bob@gmail.com',
        contactNum: '0765654345',
        gender: 'M',
        photoURL: 'http',
      };
      const createdUser = {
        id: '749971k2fa9566hf5fa595xx',
        name: 'Bob',
        lname: 'Male',
        email: 'bob@gmail.com',
        contactNum: '0765654345',
        gender: 'M',
        photoURL: 'http',
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(userDto);

      expect(result).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      const userDto: UpdateEmployeeDto = {
        fname: 'Bob',
        lname: 'Male',
        email: 'bob@gmail.com',
        contactNum: '0765654345',
        gender: 'M',
        photoURL: 'http',
      };
      const updatedUser = {
        _id: '749971k2fa9566hf5fa595xx',
        name: 'Bob',
        lname: 'Male',
        email: 'bob@gmail.com',
        contactNum: '0765654345',
        gender: 'M',
        photoURL: 'http',
      };
      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

      const result = await controller.update(
        '749971k2fa9566hf5fa595xx',
        userDto,
      );

      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const id = '740071k2fa9566hf5fa595am';
      const userDto: UpdateEmployeeDto = { name: 'Bob' };
      jest.spyOn(service, 'update').mockResolvedValue(null);

      await expect(controller.update(id, userDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should return the removed user', async () => {
      const removedUser = {
        _id: '749971k2fa9566hf5fa595xx',
        name: 'Bob',
        lname: 'Male',
        email: 'bob@gmail.com',
        contactNum: '0765654345',
        gender: 'M',
        photoURL: 'http',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(removedUser);

      const result = await controller.remove('740071k2fa9566hf5fa595am');

      expect(result).toEqual(removedUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const id = '740071k2fa9566hf5fa595am';
      jest.spyOn(service, 'remove').mockResolvedValue(null);

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
