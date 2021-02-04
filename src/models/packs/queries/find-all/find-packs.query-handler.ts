import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindPacksQuery} from "./find-packs.query";
import {PackRepository} from "../../pack.repository";
import {PackEntity} from "../../entities/pack.entity";

@QueryHandler(FindPacksQuery)
export class FindPacksQueryHandler implements IQueryHandler<FindPacksQuery> {

    constructor(
        private readonly packRepository: PackRepository
    ) {
    }

    execute(query: FindPacksQuery): Promise<PackEntity[]> {
        return this.packRepository.find();
    }

}
