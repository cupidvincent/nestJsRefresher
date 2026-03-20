import { DatabaseService } from './../database/database.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private employeeService: EmployeeService,
        private jwtService: JwtService,
        private databaseService: DatabaseService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const authUser = await this.databaseService.getUserByEmail(email);
        if (!authUser) return null;
        const isMatch = await bcrypt.compare(password, authUser.password);
        if (authUser && isMatch) {
            const { password, ...result } = authUser;
            return result;
        }
        return null;
    }

    async login(user: any, pw: string) {
        // return {
        //     access_token: this.jwtService.sign(payload),
        // };
        // return this.jwtService.sign(payload);

        const authUser = await this.databaseService.getUserByEmail(user.email);

        if (!authUser) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(pw, authUser.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
        };

        const access_token = this.jwtService.sign(payload);
        const { password, id, ...result } = authUser;
        // 4️⃣ Return token
        return {
            ...result,
            access_token,
        };
    }

    async signup(data: Prisma.UsersCreateInput) {
        return this.databaseService.createAuthUser(data);
    }
}
