import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindPokemonTypesQuery} from "./find-pokemon-types.query";
import {PokemonTypeRepository} from "../../pokemon-type.repository";

@QueryHandler(FindPokemonTypesQuery)
export class FindPokemonTypesQueryHandler implements IQueryHandler<FindPokemonTypesQuery> {

    constructor(
        private readonly pokemonTypeRepository: PokemonTypeRepository
    ) { }

    execute(query: FindPokemonTypesQuery): Promise<any> {
        return this.pokemonTypeRepository.find();
    }

}
