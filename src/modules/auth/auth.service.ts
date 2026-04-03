import { DatabaseService } from './../database/database.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma/client';
import { jwtConstants } from './constants';

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
            sub: authUser.id,
            email: authUser.email,
        };

        const access_token = this.jwtService.sign(payload);

        const refresh_token = this.jwtService.sign(payload, {
            secret: jwtConstants.refresh_secret,
            expiresIn: '7d',
        });
        const hashed = await bcrypt.hash(refresh_token, 10);
        const { password, id, ...result } = authUser;
        this.databaseService.createRefreshToken(id, hashed);
        // 4️⃣ Return token
        return {
            ...result,
            access_token,
            refresh_token,
        };
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const tokens = await this.databaseService.findRefreshTokens(userId);
        const authUser = await this.databaseService.findById(userId);
        if (!authUser) {
            throw new UnauthorizedException('Invalid credentials');
        }
        let matchedToken: { id: number; createdAt: Date; token: string; userId: number } | null =
            null;

        for (const token of tokens) {
            const isMatch = await bcrypt.compare(refreshToken, token.token);
            if (isMatch) {
                matchedToken = token;
                break;
            }
        }

        if (!matchedToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const payload = { sub: userId, username: authUser.email };

        // 🔄 rotate tokens
        const newAccessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
        });

        const newRefreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        // ❗ delete only the used token (device-specific)
        await this.databaseService.deleteRefreshToken(matchedToken.id);

        const hashed = await bcrypt.hash(newRefreshToken, 10);

        await this.databaseService.createRefreshToken(userId, hashed);
        const { password, id, ...result } = authUser;
        return {
            user: result,
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
        };
    }

    async signup(data: Prisma.UsersCreateInput) {
        return this.databaseService.createAuthUser(data);
    }
}
