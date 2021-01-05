import {EntityRepository, Repository} from "typeorm";
import {RarityEntity} from "./entities/rarity.entity";

@EntityRepository(RarityEntity)
export class RarityRepository extends Repository<RarityEntity> {

}
