import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {Query, Resolver} from "@nestjs/graphql";
import {PokemonTypesService} from "./pokemon-types.service";
import {PokemonTypeEntity} from "./entities/pokemon-type.entity";

@UseGuards(JwtAuthGuard)
@Resolver()
export class PokemonTypesResolver {

    constructor(
        private readonly pokemonTypesService: PokemonTypesService
    ) {
    }

    @Query(() => [PokemonTypeEntity])
    pokemonTypes() {
        return this.pokemonTypesService.all();
    }
}
