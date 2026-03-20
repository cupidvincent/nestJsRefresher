import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class AuthUserService {
    constructor(private databaseService: DatabaseService) {}
    create(createAuthUserDto: Prisma.UsersCreateInput) {
        return this.databaseService.createAuthUser(createAuthUserDto);
    }

    findAll() {
        return `This action returns all authUser`;
    }

    findOne(id: number) {
        return `This action returns a #${id} authUser`;
    }

    update(id: number, updateAuthUserDto: UpdateAuthUserDto) {
        return `This action updates a #${id} authUser`;
    }

    remove(id: number) {
        return `This action removes a #${id} authUser`;
    }
}
