import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {MyCardsQuery} from "./my-cards.query";
import {PaginationModel} from "../../../../common/graphql/models/pagination.model";
import {CardRepository} from "../../card.repository";

@QueryHandler(MyCardsQuery)
export class MyCardsQueryHandler implements IQueryHandler<MyCardsQuery> {

    constructor(
        private readonly cardRepository: CardRepository
    ) {
    }

    async execute(queryArgs: MyCardsQuery): Promise<any> {
        const {
            pagination: {
                page,
                amount
            },
            filter,
            userId
        } = queryArgs
        const query = this.cardRepository.createQueryBuilder('cards')
            .addSelect('COUNT(userHasCard.card_id) as amount')
            .innerJoin('user_has_card', 'userHasCard', 'userHasCard.user_id = :userId', {userId})
            .where('cards.id = userHasCard.card_id')
            .groupBy('userHasCard.card_id')
            .orderBy('amount', 'DESC');

        if (filter) {
            const {
                name,
                rarity
            } = filter;
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
