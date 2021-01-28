import {Injectable} from "@nestjs/common";
import {CardRepository} from "./card.repository";
import {PaginationModel} from "../../common/graphql/models/pagination.model";
import {CardPaginationModel} from "../../common/graphql/models/card-pagination.model";
import {CardFilterInput} from "./inputs/card-filter-input";

@Injectable()
export class CardsService {

    constructor(
        private readonly cardRepository: CardRepository
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

}
