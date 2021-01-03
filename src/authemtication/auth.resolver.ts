import {Mutation, Resolver} from "@nestjs/graphql";
import {AuthService} from "./auth.service";

@Resolver()
export class AuthResolver {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Mutation(() => String)
    login(): string {
        return 'login';
    }

    @Mutation(() => String)
    register(): string {
        return 'register';
    }

}
