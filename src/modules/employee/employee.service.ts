import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class EmployeeService {
    constructor(private readonly databaseService: DatabaseService) {}
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];
    create(createEmployeeDto: Prisma.EmployeeCreateInput) {
        return this.databaseService.employee.create({
            data: createEmployeeDto,
        });
    }

    findAll(role?: 'developer' | 'manager' | 'intern') {
        if (role) {
            return this.databaseService.employee.findMany({
                where: {
                    role,
                },
            });
        }
        return this.databaseService.employee.findMany();
    }

    findOne(id: number) {
        return this.databaseService.employee.findUnique({
            where: {
                id,
            },
        });
    }

    update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
        return this.databaseService.employee.update({
            where: {
                id,
            },
            data: updateEmployeeDto,
        });
    }

    remove(id: number) {
        return this.databaseService.employee.delete({
            where: {
                id,
            },
        });
    }

    async findOneUserName(username: string): Promise<any | undefined> {
        return this.users.find((user) => user.username === username);
    }
}
