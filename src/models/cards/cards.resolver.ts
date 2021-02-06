import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
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
import {QuickSellCardInput} from "./inputs/quick-sell-card.input";

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
        @Args('pagination') pagination: PaginationArgs
    ): Promise<CardPaginationModel> {
        return this.cardsService.cardsPaginated(pagination, cardFilter);
    }

    @Query(() => CardEntity)
    card(
        @Args('id', {type: () => Int}) cardId: number
    ) {
        return this.cardsService.card(cardId);
    }

    @Query(() => CardPaginationModel)
    myCards(
        @CurrentUser() user: UserEntity,
        @Args('filter', {nullable: true}) cardFilter: CardFilterInput,
        @Args('pagination') pagination: PaginationArgs
    ): Promise<CardPaginationModel> {
        return this.cardsService.myCards(user.id, pagination, cardFilter);
    }

    @Mutation(() => CardEntity)
    quickSellCard(
        @CurrentUser() user: UserEntity,
        @Args('cardInfo') {cardId, amount}: QuickSellCardInput
    ) {
        return this.cardsService.quickSell(user.id, cardId, amount);
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
