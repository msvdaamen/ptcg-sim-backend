import {EntityRepository, Repository} from "typeorm";
import {UserStatsEntity} from "../entities/user-stats.entity";

@EntityRepository(UserStatsEntity)
export class UserStatsRepository extends Repository<UserStatsEntity> {

}
