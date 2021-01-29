import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindCardsPaginatedQuery} from "./find-cards-paginated.query";
import {PaginationModel} from "../../../../common/graphql/models/pagination.model";
import {CardRepository} from "../../card.repository";

@QueryHandler(FindCardsPaginatedQuery)
export class FindCardsPaginatedQueryHandler implements IQueryHandler<FindCardsPaginatedQuery> {

    constructor(
        private readonly cardRepository: CardRepository
    ) {
    }

    async execute({pagination: paginationArgs, filter}: FindCardsPaginatedQuery): Promise<any> {
        const {
            page,
            amount
        } = paginationArgs;
        const query = this.cardRepository.createQueryBuilder('cards').orderBy('cards.name', "ASC");
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
