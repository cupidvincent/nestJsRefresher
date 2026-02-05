/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsEnum(['developer', 'manager', 'intern'], {
        message: 'Valid Role Reqiured',
    })
    role!: 'developer' | 'manager' | 'intern';
}
