import {Injectable} from "@nestjs/common";
import {PokemonTypeRepository} from "./pokemon-type.repository";

@Injectable()
export class PokemonTypesService {

    constructor(
        private readonly pokemonTypeRepository: PokemonTypeRepository
    ) {
    }

    all() {
        return this.pokemonTypeRepository.find();
    }
}
