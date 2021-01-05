import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {getRepository} from "typeorm";
import {jwtConstants} from "../common/constants/jwt.constants";
import {UserEntity} from "../models/users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: {id: number, email: string}): Promise<UserEntity> {
        return getRepository(UserEntity).findOne({
            where: {
                id: payload.id,
                email: payload.email
            }
        });
    }
}
