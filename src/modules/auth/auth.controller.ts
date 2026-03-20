import {
    Body,
    Controller,
    Get,
    Post,
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
        console.log({ user: req.user, body: req.body });
        const { access_token, ...rest } = await this.authService.login(req.user, req.body.password);
        console.log(' - 1', req.user, access_token, req.body);

        console.log('my --- 2', rest);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false, // true in production (https)
        });
        return rest;
    }

    @UseGuards(JwtAuthGuard)
    @Get('details')
    async details(@Request() req) {
        console.log('reee', req.user);
        const authUser = await this.databaseService.getUserByEmail(req.user.username);

        if (!authUser) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { password, id, ...rest } = authUser;
        return rest;
    }
}
