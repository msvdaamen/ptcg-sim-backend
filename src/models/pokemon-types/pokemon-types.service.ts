import {Injectable} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {FindPokemonTypesQuery} from "./queries/find-all/find-pokemon-types.query";
import {PokemonTypeEntity} from "./entities/pokemon-type.entity";

@Injectable()
export class PokemonTypesService {

    constructor(
        private queryBus: QueryBus
    ) {
    }

    all(): Promise<PokemonTypeEntity[]> {
        return this.queryBus.execute(
            new FindPokemonTypesQuery()
        );
    }
}
