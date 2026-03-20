import { UsersCreateInput } from './../../../generated/prisma/models/Users';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
        super({ adapter });
    }

    /**
     *
     * Below are the /user or /auth operations
     */

    async findEmployee() {
        return this.employee.findMany();
    }

    async getUserByEmail(email: string) {
        return this.users.findUnique({
            where: {
                email,
            },
        });
    }

    async createAuthUser(data: Prisma.UsersCreateInput) {
        const saltRounds = 10;
        if (!data.password) return;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        return this.users.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
    }

    /**
     *
     * Below are the /task operations
     */

    async getAllTasks(userId: number) {
        return this.tasks.findMany({
            where: {
                userId,
            },
        });
    }

    async createTasks(data: Prisma.TasksCreateInput, userId: number) {
        return this.tasks.create({
            data: {
                ...data,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async deleteTask(taskId: number) {
        return this.tasks.delete({
            where: {
                id: taskId,
            },
        });
    }

    async updateTask(taskId: number, updateBody: Prisma.TasksUpdateInput) {
        return this.tasks.update({
            where: {
                id: taskId,
            },
            data: updateBody,
        });
    }
}
