import {Args, Parent, Query, ResolveProperty, Resolver} from "@nestjs/graphql";
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

    @ResolveProperty(() => ImageEntity, {nullable: true})
    image(
        @Parent() card: CardEntity
    ): Promise<ImageEntity> {
        return this.cardsDataLoader.image.load(card.id);
    }

    @ResolveProperty(() => ImageEntity, {nullable: true})
    imageHRes(
        @Parent() card: CardEntity
    ): Promise<ImageEntity> {
        return this.cardsDataLoader.imageHRes.load(card.id);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [CardEntity])
    myCards(
        @CurrentUser() user: UserEntity
    ) {
        return this.cardsService.myCards(user.id);
    }

    @ResolveProperty(() => Boolean)

    hasCard(
        @CurrentUser() user: UserEntity,
        @Parent() card: CardEntity
    ) {
        return false;
        // return this.cardsDataLoader.hasCard.load({userId: user.id, cardId: card.id});
    }
}
