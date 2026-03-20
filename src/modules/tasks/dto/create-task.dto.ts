import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    description;

    @IsNotEmpty()
    @IsString()
    @IsEnum(['open', 'in-progress', 'in-review', 'complete'], {
        message: 'Valid Status Reqiured',
    })
    status: 'open' | 'in-progress' | 'in-review' | 'complete';

    @IsInt()
    @IsOptional()
    userId: number;

    @IsOptional()
    user: any;
}
