import { IsNotEmpty } from "class-validator";

export class addTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string
}