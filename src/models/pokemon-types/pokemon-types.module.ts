import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PokemonTypeEntity} from "./entities/pokemon-type.entity";
import {PokemonTypeRepository} from "./pokemon-type.repository";
import {PokemonTypesService} from "./pokemon-types.service";
import {PokemonTypesResolver} from "./pokemon-types.resolver";
import {CqrsModule} from "@nestjs/cqrs";
import {FindPokemonTypesQueryHandler} from "./queries/find-all/find-pokemon-types.query-handler";

const commandHandlers = [];
const queryHandlers = [FindPokemonTypesQueryHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([PokemonTypeEntity, PokemonTypeRepository]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        PokemonTypesService,
        PokemonTypesResolver
    ]
})
export class PokemonTypesModule {

}
