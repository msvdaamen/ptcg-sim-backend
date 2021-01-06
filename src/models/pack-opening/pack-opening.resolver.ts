import {Mutation, Resolver} from "@nestjs/graphql";
import {PackOpeningService} from "./pack-opening.service";
import {CardEntity} from "../cards/entities/card.entity";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {CurrentUser} from "../../common/decorators/current-user";
import {UserEntity} from "../users/entities/user.entity";

@UseGuards(JwtAuthGuard)
@Resolver()
export class PackOpeningResolver {

    constructor(
        private readonly packOpeningService: PackOpeningService
    ) {
    }

    @Mutation(() => [CardEntity])
    openPack(
        @CurrentUser() user: UserEntity
    ) {
        return this.packOpeningService.open(user.id);
    }
}
