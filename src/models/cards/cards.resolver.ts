import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {CardEntity} from "./entities/card.entity";
import {CardsService} from "./cards.service";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {CardPaginationModel} from "../../common/graphql/models/card-pagination.model";
import {PaginationArgs} from "../../common/graphql/args/pagination.args";
import {CardFilterInput} from "./inputs/card-filter-input";
import {CardsDataLoader} from "./cards.data-loader";
import {ImageEntity} from "../images/entities/image.entity";
import {CurrentUser} from "../../common/decorators/current-user";
import {UserEntity} from "../users/entities/user.entity";
import {RarityEntity} from "../rarities/entities/rarity.entity";

@UseGuards(JwtAuthGuard)
@Resolver(CardEntity)
export class CardsResolver {

    constructor(
        private readonly cardsService: CardsService,
        private readonly cardsDataLoader: CardsDataLoader
    ) {
    }

    @Query(() => CardPaginationModel)
    cardsPaginated(
        @Args('filter', {nullable: true}) cardFilter: CardFilterInput,
        @Args('pagination') {page, amount}: PaginationArgs
    ): Promise<CardPaginationModel> {
        return this.cardsService.cardsPaginated(page, amount, cardFilter);
    }

    @ResolveField(() => ImageEntity, {nullable: true})
    image(
        @Parent() card: CardEntity
    ): Promise<ImageEntity> {
        return this.cardsDataLoader.image.load(card.id);
    }

    @ResolveField(() => ImageEntity, {nullable: true})
    imageHRes(
        @Parent() card: CardEntity
    ): Promise<ImageEntity> {
        return this.cardsDataLoader.imageHRes.load(card.id);
    }

    @ResolveField(() => RarityEntity)
    rarity(
        @Parent() card: CardEntity
    ) {
        return this.cardsDataLoader.rarity.load(card.id);
    }

    @Query(() => [CardEntity])
    myCards(
        @CurrentUser() user: UserEntity
    ) {
        return this.cardsService.myCards(user.id);
    }

    @ResolveField(() => Boolean)
    hasCard(
        @CurrentUser() user: UserEntity,
        @Parent() card: CardEntity
    ) {
        return this.cardsDataLoader.hasCard(user.id).load(card.id);
    }

    @ResolveField(() => Number)
    amount(
        @CurrentUser() user: UserEntity,
        @Parent() card: CardEntity
    ) {
        return this.cardsDataLoader.amount(user.id).load(card.id);
    }



}
