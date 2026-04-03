import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    Res,
    UnauthorizedException,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/lib/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/lib/auth/guards/jwt-auth.guard';
import { CreateAuthUserDto } from '../auth-user/dto/create-auth-user.dto';
import { DatabaseService } from '../database/database.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtRefreshGuard } from 'src/lib/auth/guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private databaseService: DatabaseService,
    ) {}

    @Post('signup')
    create(@Body(ValidationPipe) createAuthUserDto: CreateAuthUserDto) {
        return this.authService.signup(createAuthUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res) {
        const { access_token, refresh_token, ...rest } = await this.authService.login(
            req.user,
            req.body.password,
        );

        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false, // true in production (https)
        });

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false, // true in production (https)
        });
        return rest;
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(@Req() req, @Res({ passthrough: true }) res) {
        const { access_token, refresh_token, user } = await this.authService.refreshTokens(
            req.user.userId,
            req.user.refreshToken,
        );

        res.cookie('access_token', access_token, { httpOnly: true });
        res.cookie('refresh_token', refresh_token, { httpOnly: true });

        return { success: true };
    }

    @UseGuards(JwtAuthGuard)
    @Get('details')
    async details(@Request() req) {
        const authUser = await this.databaseService.getUserByEmail(req.user.username);

        if (!authUser) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { password, id, ...rest } = authUser;
        return rest;
    }
}
