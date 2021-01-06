import {Query, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {CardTypesService} from "./card-types.service";
import {CardTypeEntity} from "./entities/card-type.entity";

@UseGuards(JwtAuthGuard)
@Resolver()
export class CardTypesResolver {

    constructor(
        private readonly cardTypesService: CardTypesService
    ) {
    }

    @Query(() => [CardTypeEntity])
    cardTypes() {
        return this.cardTypesService.all();
    }
}
