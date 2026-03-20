import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    Request,
    UseGuards,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/lib/auth/guards/jwt-auth.guard';
import { Prisma } from 'generated/prisma/client';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Request() req) {
        console.log({ reee: req.user });
        return this.tasksService.create(createTaskDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req) {
        return this.tasksService.findAll(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tasksService.findOne(+id);
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: Prisma.TasksUpdateInput) {
        console.log({
            id,
            updateTaskDto,
        });
        return this.tasksService.update(+id, updateTaskDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    remove(@Query('taskId', ParseIntPipe) taskId: number) {
        return this.tasksService.remove(taskId);
    }
}
