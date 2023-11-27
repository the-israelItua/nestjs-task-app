import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { addTaskDto } from './dto/add-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAlltasks() {
        return this.tasks
    }

    getTasksWithFilter(filter: GetTasksFilterDto) {
        const filteredTasks = this.tasks.filter(item => item.status === filter.status && item.title === filter.search)
        return filteredTasks
    }

    getTaskByID(id: string): Task {
        const task = this.tasks.find(item => item.id === id)

        if(!task){
            throw new NotFoundException("Task not found")
        }

         return task
     }

    addTask(addTaskDto: addTaskDto): Task {
        const {title, description} = addTaskDto

        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(newTask)
        return newTask
    }

    deleteTask(id: string): void {
        const task = this.getTaskByID(id)
        const newTasks = this.tasks.filter(item => item.id !== task.id)
        this.tasks = newTasks
     }

     updateTaskStatus(id: string, status: TaskStatus): Task {
        const taskToUpdate = this.getTaskByID(id)
        taskToUpdate.status = status
        return taskToUpdate
     }
}
