import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {AuthService} from "./auth.service";
import {AuthUser} from "../common/models/auth-user";
import {LoginInput} from "./input/login.input";
import {UnauthorizedException, UseGuards} from "@nestjs/common";
import {RegisterInput} from "./input/register.input";
import {CardEntity} from "../models/cards/entities/card.entity";
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import {CurrentUser} from "../common/decorators/current-user";
import {UserEntity} from "../models/users/entities/user.entity";

@Resolver()
export class AuthResolver {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Mutation(() => AuthUser)
    async login(
        @Args('loginCredentials') {email, password}: LoginInput
    ): Promise<AuthUser> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.login(user);
    }

    @Mutation(() => AuthUser)
    register(
        @Args('registerCredentials') {email, password, passwordConfirmation}: RegisterInput
    ): Promise<AuthUser> {
        if (password !== passwordConfirmation) {
            throw new UnauthorizedException('Password and password confirmation does not match');
        }
        return this.authService.register(email, password);
    }
}
