import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PokemonTypeEntity} from "./entities/pokemon-type.entity";
import {PokemonTypeRepository} from "./pokemon-type.repository";
import {PokemonTypesService} from "./pokemon-types.service";
import {PokemonTypesResolver} from "./pokemon-types.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([PokemonTypeEntity, PokemonTypeRepository])
    ],
    providers: [
        PokemonTypesService,
        PokemonTypesResolver
    ]
})
export class PokemonTypesModule {

}
