import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Employee Module')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'create new employee record' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'this is unique, auto generated id by mongo db',
          example: '64007152fa9566ef5fa595a1',
        },
        fname: {
          type: 'string',
          description: 'this is the first name',
          example: 'Thanuja',
        },
        lname: {
          type: 'string',
          description: 'this is the last name',
          example: 'Perera',
        },
        email: {
          type: 'string',
          description: 'this is the email address',
          example: 'thanuja@swivelgroup.com.au',
        },
        contactNum: {
          type: 'string',
          description: 'this is the phone number',
          example: '0778656453',
        },
        photoURL: {
          type: 'string',
          description: 'this is a image URL',
          example: 'https://randomuser.me/api/portraits/men/30.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'saved...',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employee data from this api' })
  @ApiResponse({
    status: 200,
    description: 'All Data list',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'this is unique, auto generated id by mongo db',
            example: '64007152fa9566ef5fa595a1',
          },
          fname: {
            type: 'string',
            description: 'this is the first name',
            example: 'Thanuja',
          },
          lname: {
            type: 'string',
            description: 'this is the last name',
            example: 'Perera',
          },
          email: {
            type: 'string',
            description: 'this is the email address',
            example: 'thanuja@swivelgroup.com.au',
          },
          contactNum: {
            type: 'string',
            description: 'this is the phone number',
            example: '0778656453',
          },
          photoURL: {
            type: 'string',
            description: 'this is a image URL',
            example: 'https://randomuser.me/api/portraits/men/30.jpg',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one employee record by ID' })
  @ApiParam({
    name: 'id',
    type: 'String',
    description: 'auto generated employee id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'one employee record by ID',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'this is unique, auto generated id by mongo db',
          example: '64007152fa9566ef5fa595a1',
        },
        fname: {
          type: 'string',
          description: 'this is the first name',
          example: 'Thanuja',
        },
        lname: {
          type: 'string',
          description: 'this is the last name',
          example: 'Perera',
        },
        email: {
          type: 'string',
          description: 'this is the email address',
          example: 'thanuja@swivelgroup.com.au',
        },
        contactNum: {
          type: 'string',
          description: 'this is the phone number',
          example: '0778656453',
        },
        photoURL: {
          type: 'string',
          description: 'this is a image URL',
          example: 'https://randomuser.me/api/portraits/men/30.jpg',
        },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update employee record by ID' })
  @ApiParam({
    name: 'id',
    type: 'String',
    description: 'auto generated employee id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',

      properties: {
        id: {
          type: 'string',
          description: 'this is unique, auto generated id by mongo db',
          example: '64007152fa9566ef5fa595a1',
        },
        fname: {
          type: 'string',
          description: 'this is the first name',
          example: 'Thanuja',
        },
        lname: {
          type: 'string',
          description: 'this is the last name',
          example: 'Perera',
        },
        email: {
          type: 'string',
          description: 'this is the email address',
          example: 'thanuja@swivelgroup.com.au',
        },
        contactNum: {
          type: 'string',
          description: 'this is the phone number',
          example: '0778656453',
        },
        photoURL: {
          type: 'string',
          description: 'this is a image URL',
          example: 'https://randomuser.me/api/portraits/men/30.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete one employee record by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'enter unique auto generated id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'deleted one record',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
