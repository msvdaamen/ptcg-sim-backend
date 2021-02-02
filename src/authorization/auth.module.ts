import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthResolver} from "./auth.resolver";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../common/constants/jwt.constants";
import {JwtStrategy} from "./jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../models/users/entities/user.entity";
import {UserRepository} from "../models/users/user.repository";
import {CardRepository} from "../models/cards/card.repository";
import {UserStatsRepository} from "../models/users/repositories/user-stats.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserRepository, CardRepository, UserStatsRepository]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '8h' },
        }),
    ],
    providers: [
        AuthService,
        AuthResolver,
        JwtStrategy
    ]
})
export class AuthModule {

}
