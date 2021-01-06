import {EntityRepository, Repository} from "typeorm";
import {CardTypeEntity} from "./entities/card-type.entity";

@EntityRepository(CardTypeEntity)
export class CardTypeRepository extends Repository<CardTypeEntity> {

}
