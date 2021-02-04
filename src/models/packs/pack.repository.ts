import {EntityRepository, Repository} from "typeorm";
import {PackEntity} from "./entities/pack.entity";

@EntityRepository(PackEntity)
export class PackRepository extends Repository<PackEntity> {

}
