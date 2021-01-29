import {Injectable} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {FindRaritiesQuery} from "./query/find-all/find-rarities.query";
import {RarityEntity} from "./entities/rarity.entity";

@Injectable()
export class RaritiesService {

    constructor(
        private readonly queryBus: QueryBus
    ) {
    }

    all(): Promise<RarityEntity[]> {
        return this.queryBus.execute(
            new FindRaritiesQuery()
        );
    }
}
