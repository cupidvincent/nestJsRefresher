import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeModule } from '../employee/employee.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/lib/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/lib/auth/strategies/jwt.strategy';

@Module({
    imports: [
        EmployeeModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
