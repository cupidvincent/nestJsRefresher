import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    findAll(@Query('role') role?: 'developer' | 'manager' | 'intern') {
        return this.usersService.findAll(role);
    }

    @Get('interns')
    findAllInterns() {
        return [];
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    patchOne(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe)
        userUpdate: UpdateUserDto,
    ) {
        return this.usersService.patchOne(id, userUpdate);
    }

    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteOne(id);
    }
}
