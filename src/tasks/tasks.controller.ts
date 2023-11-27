import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { addTaskDto } from './dto/add-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilter(filterDto)
        }else{
            return this.tasksService.getAlltasks()
        }
    }

    @Get("/:id")
    getTaskByID(@Param("id") id: string): Task {
        return this.tasksService.getTaskByID(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    addTask(@Body() addTaskDto: addTaskDto): Task {
        return this.tasksService.addTask(addTaskDto)
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string): void {
        return this.tasksService.deleteTask(id)
    }

    @Patch("/:id")
    updateTaskStatus(
        @Param("id")  id: string,
        @Body("status", TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status)
    }
}
