import {EntityRepository, Repository} from "typeorm";
import {UserHasCardEntity} from "./entities/user-has-card.entity";

@EntityRepository(UserHasCardEntity)
export class UserHasCardRepository extends Repository<UserHasCardEntity> {

}
