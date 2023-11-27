import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses: string[] = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: TaskStatus, metadata: ArgumentMetadata) {
       if(!this.isStatusValid(value?.toUpperCase())){
        throw new BadRequestException(`${value} is not a valid status`)
       }

        return value
    }

    private isStatusValid(status: string){
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1
    }
}