import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
// import { Prisma } from 'src/lib/prisma';

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
        super({ adapter });
    }

    async findEmployee() {
        return this.employee.findMany();
    }
    // async onModuleInit() {
    //     await this.$connect();
    // }
}
