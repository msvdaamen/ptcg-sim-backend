import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthResolver} from "./auth.resolver";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../common/constants/jwt.constants";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
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
