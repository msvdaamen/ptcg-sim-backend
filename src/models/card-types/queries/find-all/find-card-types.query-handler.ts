import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindCardTypesQuery} from "./find-card-types.query";
import {CardTypeRepository} from "../../card-type.repository";
import {CardTypeEntity} from "../../entities/card-type.entity";

@QueryHandler(FindCardTypesQuery)
export class FindCardTypesQueryHandler implements IQueryHandler<FindCardTypesQuery> {

    constructor(
        private readonly cardTypeRepository: CardTypeRepository
    ) {
    }

    execute(query: FindCardTypesQuery): Promise<CardTypeEntity[]> {
        return this.cardTypeRepository.find();
    }

}
