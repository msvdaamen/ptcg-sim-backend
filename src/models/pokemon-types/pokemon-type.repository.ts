import {EntityRepository, Repository} from "typeorm";
import {PokemonTypeEntity} from "./entities/pokemon-type.entity";

@EntityRepository(PokemonTypeEntity)
export class PokemonTypeRepository extends Repository<PokemonTypeEntity> {

}
