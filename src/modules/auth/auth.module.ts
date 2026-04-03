import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeModule } from '../employee/employee.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/lib/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/lib/auth/strategies/jwt.strategy';
import { DatabaseModule } from '../database/database.module';
import { JwtRefreshStrategy } from 'src/lib/auth/strategies/jwt-refresh.strategy';

@Module({
    imports: [
        DatabaseModule,
        EmployeeModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1m' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
