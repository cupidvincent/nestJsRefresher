import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { DatabaseModule } from './modules/database/database.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
    imports: [UsersModule, DatabaseModule, EmployeeModule],
    controllers: [AppController, UsersController],
    providers: [AppService],
})
export class AppModule {}
