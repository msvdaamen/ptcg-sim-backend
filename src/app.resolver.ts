import {Query, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "./common/guards/jwt-auth.guard";

@Resolver()
export class AppResolver {

    @Query(() => String)
    hello(): string {
        return 'world';
    }
}
