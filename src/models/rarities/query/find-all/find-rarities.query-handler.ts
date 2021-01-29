import {IEventHandler, IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindRaritiesQuery} from "./find-rarities.query";
import {RarityRepository} from "../../rarity.repository";

@QueryHandler(FindRaritiesQuery)
export class FindRaritiesQueryHandler implements IQueryHandler<FindRaritiesQuery> {

    constructor(
        private readonly rarityRepository: RarityRepository
    ) {
    }

    execute(event: FindRaritiesQuery): any {
        return this.rarityRepository.find();
    }

}
