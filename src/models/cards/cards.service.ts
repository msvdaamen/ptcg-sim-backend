import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CardRepository} from "./card.repository";
import {PaginationModel} from "../../common/graphql/models/pagination.model";
import {CardPaginationModel} from "../../common/graphql/models/card-pagination.model";
import {CardFilterInput} from "./inputs/card-filter-input";
import {UserHasCardRepository} from "../users/user-has-card.repository";
import {CardQuickSellModel} from "./models/card-quick-sell.model";
import {OrderRepository} from "../exchange/orders/order.repository";
import {UserRepository} from "../users/user.repository";
import {CardEntity} from "./entities/card.entity";
import {getConnection} from "typeorm";
import {UserEntity} from "../users/entities/user.entity";

@Injectable()
export class CardsService {

    constructor(
        private readonly cardRepository: CardRepository,
        private readonly userHasCardRepository: UserHasCardRepository,
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository
    ) {
    }

    async cardsPaginated(page: number, amount: number, cardFilter: CardFilterInput = null): Promise<CardPaginationModel> {
        const query = this.cardRepository.createQueryBuilder('cards').orderBy('cards.name', "ASC");
        if (cardFilter) {
            const {
                name,
                rarity
            } = cardFilter;
            if (name) {
                query.andWhere('cards.name LIKE :name', {name: `%${name}%`})
            }
            if (rarity) {
                query.andWhere('cards.rarityId = :rarity', {rarity})
            }
        }
        const [
            cards,
            total
        ] = await Promise.all([
            query.offset((page - 1) * amount).limit(amount).getMany(),
            query.getCount()
        ]);
        const pagination = PaginationModel.create(
            total,
            amount,
            page,
            cards.length
        );
        return {
            cards,
            pagination
        };
    }

    card(cardId: number) {
        return this.cardRepository.findOne({
            id: cardId
        })
    }

    async myCards(userId: number, page: number, amount: number, cardFilter: CardFilterInput = null): Promise<CardPaginationModel> {
        const query = this.cardRepository.createQueryBuilder('cards')
            .addSelect('COUNT(userHasCard.card_id) as amount')
            .innerJoin('user_has_card', 'userHasCard', 'userHasCard.user_id = :userId', {userId})
            .where('cards.id = userHasCard.card_id')
            .groupBy('userHasCard.card_id')
            .orderBy('amount', 'DESC');

        if (cardFilter) {
            const {
                name,
                rarity
            } = cardFilter;
            if (name) {
                query.andWhere('cards.name LIKE :name', {name: `%${name}%`})
            }
            if (rarity) {
                query.andWhere('cards.rarityId = :rarity', {rarity})
            }
        }

        const [
            cards,
            total
        ] = await Promise.all([
            query.offset((page - 1) * amount).limit(amount).getMany(),
            query.getCount()
        ]);
        const pagination = PaginationModel.create(
            total,
            amount,
            page,
            cards.length
        );
        return {
            cards,
            pagination
        };
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

    async sell(userId: number, cardId: number, price: number): Promise<CardEntity> {
        const {affected} = await this.userHasCardRepository
            .createQueryBuilder('userHasCard')
            .where('userHasCard.userId = :userId AND userHasCard.cardId = :cardId', {userId, cardId})
            .limit(1)
            .delete()
            .execute();
        if (!affected) {
            throw new HttpException(`You don't have that card`,  HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const now = new Date();
        const expireDate = new Date().setHours(now.getHours() + 4);
        const createOrder = this.orderRepository.create({
            userId,
            cardId,
            price,
            createdAt: now,
            expireDate
        });
        const [
            order,
            card
        ] = await Promise.all([
            this.orderRepository.save(createOrder),
            this.cardRepository.findOne({id:  cardId})
        ]);
        return card;
    }

}
