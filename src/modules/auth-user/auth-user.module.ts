import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthUserController],
    providers: [AuthUserService],
    exports: [AuthUserService],
})
export class AuthUserModule {}
