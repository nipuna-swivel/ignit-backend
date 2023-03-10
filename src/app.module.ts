import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    EmployeesModule,
    MongooseModule.forRoot(
      'mongodb+srv://Nipuna:QwbLqITi8N7BQ330@cluster0.jy2kp1m.mongodb.net/employeeDb?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
