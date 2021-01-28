import {Int, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RaritiesService} from "./rarities.service";
import {RarityEntity} from "./entities/rarity.entity";
import {RarityDataLoader} from "./rarity.data-loader";
import {CurrentUser} from "../../common/decorators/current-user";
import {UserEntity} from "../users/entities/user.entity";

@UseGuards(JwtAuthGuard)
@Resolver(RarityEntity)
export class RaritiesResolver {

    constructor(
        private readonly raritiesService: RaritiesService,
        private readonly rarityDataloader: RarityDataLoader
    ) {
    }

    @Query(() => [RarityEntity])
    rarities() {
        return this.raritiesService.all();
    }

    @ResolveField(() => Int)
    totalCards(
        @Parent() rarity: RarityEntity
    ) {
        return this.rarityDataloader.cardAmount.load(rarity.id);
    }

    @ResolveField(() => Int)
    cardsOwned(
        @CurrentUser() user: UserEntity,
        @Parent() rarity: RarityEntity
    ) {
        return this.rarityDataloader.cardsOwned(user.id).load(rarity.id);
    }
}
