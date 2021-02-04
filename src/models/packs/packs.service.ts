import {Injectable} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {FindPacksQuery} from "./queries/find-all/find-packs.query";

@Injectable()
export class PacksService {

    constructor(
        private readonly queryBus: QueryBus
    ) {
    }

    find() {
        return this.queryBus.execute(
          new FindPacksQuery()
        );
    }
}
