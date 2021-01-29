import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneCardQuery} from "./find-one-card.query";
import {CardRepository} from "../../card.repository";
import {CardEntity} from "../../entities/card.entity";

@QueryHandler(FindOneCardQuery)
export class FindOneCardQueryHandler implements IQueryHandler<FindOneCardQuery> {

    constructor(
        private readonly cardRepository: CardRepository
    ) {
    }

    execute({cardId}: FindOneCardQuery): Promise<CardEntity> {
        return this.cardRepository.findOne({
            id: cardId
        });
    }

}
