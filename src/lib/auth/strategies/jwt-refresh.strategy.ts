import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/modules/auth/constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.refresh_token]),
            secretOrKey: jwtConstants.refresh_secret,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const refreshToken = req?.cookies?.refresh_token;

        return {
            userId: payload.sub,
            username: payload.email,
            refreshToken,
        };
    }
}
