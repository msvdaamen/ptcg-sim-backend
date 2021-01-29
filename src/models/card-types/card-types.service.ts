import {Injectable} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {FindCardTypesQuery} from "./queries/find-all/find-card-types.query";
import {CardTypeEntity} from "./entities/card-type.entity";

@Injectable()
export class CardTypesService {

    constructor(
        private readonly queryBus: QueryBus
    ) {
    }

    all(): Promise<CardTypeEntity[]> {
        return this.queryBus.execute(
            new FindCardTypesQuery()
        );
    }
}
