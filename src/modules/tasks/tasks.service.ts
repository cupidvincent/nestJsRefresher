import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class TasksService {
    constructor(private databaseService: DatabaseService) {}
    async create(createTaskDto: Prisma.TasksCreateInput, userId: number) {
        return this.databaseService.createTasks(createTaskDto, userId);
    }

    findAll(userId: number) {
        return this.databaseService.getAllTasks(userId);
    }

    findOne(id: number) {
        return `This action returns a #${id} task`;
    }

    update(id: number, updateTaskDto: Prisma.TasksUpdateInput) {
        return this.databaseService.updateTask(id, updateTaskDto);
    }

    remove(id: number) {
        return this.databaseService.deleteTask(id);
    }
}
