import {Mutation, Resolver} from "@nestjs/graphql";
import {PackOpeningService} from "./pack-opening.service";
import {CardEntity} from "../cards/entities/card.entity";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Resolver()
export class PackOpeningResolver {

    constructor(
        private readonly packOpeningService: PackOpeningService
    ) {
    }

    @Mutation(() => [CardEntity])
    openPack() {
        return this.packOpeningService.open();
    }
}
