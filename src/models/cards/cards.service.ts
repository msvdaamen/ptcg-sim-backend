import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CardRepository} from "./card.repository";
import {CardPaginationModel} from "../../common/graphql/models/card-pagination.model";
import {UserHasCardRepository} from "../users/user-has-card.repository";
import {CardQuickSellModel} from "./models/card-quick-sell.model";
import {OrderRepository} from "../exchange/orders/order.repository";
import {CardEntity} from "./entities/card.entity";
import {getConnection} from "typeorm";
import {UserEntity} from "../users/entities/user.entity";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {PaginationInterface} from "../../common/interfaces/common/pagination.interface";
import {CardFilterInterface} from "../../common/interfaces/cards/card-filter.interface";
import {FindCardsPaginatedQuery} from "./queries/find-all-paginated/find-cards-paginated.query";
import {FindOneCardQuery} from "./queries/find-one/find-one-card.query";
import {MyCardsQuery} from "./queries/my-cards/my-cards.query";
import {CreateOrderCommand} from "../exchange/orders/commands/create-order/create-order.command";

@Injectable()
export class CardsService {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly cardRepository: CardRepository,
        private readonly userHasCardRepository: UserHasCardRepository
    ) {
    }

    async cardsPaginated(pagination: PaginationInterface, filter: CardFilterInterface = null): Promise<CardPaginationModel> {
        return this.queryBus.execute(
            new FindCardsPaginatedQuery(pagination, filter)
        );
    }

    card(cardId: number): Promise<CardEntity> {
        return this.queryBus.execute(
            new FindOneCardQuery(cardId)
        );
    }

    async myCards(userId: number, pagination: PaginationInterface, filter: CardFilterInterface = null): Promise<CardPaginationModel> {
        return this.queryBus.execute(
            new MyCardsQuery(userId, pagination, filter)
        );
    }

    async quickSell(userId: number, cardId: number, amount: number): Promise<CardQuickSellModel> {
        const value = 1;
        const [
            {affected},
            card
        ] = await Promise.all([
            this.userHasCardRepository
                .createQueryBuilder('userHasCard')
                .where('userHasCard.userId = :userId AND userHasCard.cardId = :cardId', {userId, cardId})
                .limit(amount)
                .delete()
                .execute(),
            this.cardRepository.findOne({id: cardId})
        ]);
        if (!affected) {
            throw new HttpException('No cards are sold',  HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const coins = value * affected;
        await getConnection().transaction(async manager => {
            const user = await manager.findOne(UserEntity, {id: userId});
            const newBalance = manager.create(UserEntity, {
                ...user,
                balance: user.balance + coins
            })
            await manager.save(newBalance);
        });
        return {
            card,
            value: coins
        };
    }

    async placeOrder(userId: number, cardId: number, price: number): Promise<CardEntity> {
        return this.commandBus.execute(
            new CreateOrderCommand(userId, cardId, price)
        );
    }

}
