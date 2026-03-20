import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { Prisma } from 'generated/prisma/client';

@Controller('auth-user')
export class AuthUserController {
    constructor(private readonly authUserService: AuthUserService) {}

    @Post()
    create(@Body(ValidationPipe) createAuthUserDto: CreateAuthUserDto) {
        return this.authUserService.create(createAuthUserDto);
    }

    @Get()
    findAll() {
        return this.authUserService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authUserService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthUserDto: UpdateAuthUserDto) {
        return this.authUserService.update(+id, updateAuthUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authUserService.remove(+id);
    }
}
