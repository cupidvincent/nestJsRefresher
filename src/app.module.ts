import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { DatabaseModule } from './modules/database/database.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './lib/auth/guards/jwt-auth.guard';
import { TasksModule } from './modules/tasks/tasks.module';
import { TasksController } from './modules/tasks/tasks.controller';
import { AuthUserModule } from './modules/auth-user/auth-user.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        DatabaseModule,
        EmployeeModule,
        AuthModule,
        TasksModule,
        AuthUserModule,
    ],
    controllers: [AppController, UsersController, AuthController, TasksController],
    providers: [
        AppService,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard,
        // },
    ],
})
export class AppModule {}
