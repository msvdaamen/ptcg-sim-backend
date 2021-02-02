import {Injectable, Scope} from "@nestjs/common";
import * as DataLoader from "dataloader";
import {UserStatsEntity} from "./entities/user-stats.entity";
import {getRepository} from "typeorm";
import {DataLoaderHelper} from "../../common/helpers/data-loader.helper";

@Injectable({
    scope: Scope.REQUEST
})
export class UserDataLoader {

    private _userStatsDataLoader: DataLoader<number, UserStatsEntity>;

    get userStats() {
        if (!this._userStatsDataLoader) {
            this.createUserStatsDataLoader();
        }
        return this._userStatsDataLoader;
    }

    private createUserStatsDataLoader() {
        this._userStatsDataLoader = new DataLoader<number, UserStatsEntity>(async (userIds: number[]) => {
            const userStats = await getRepository(UserStatsEntity)
                .createQueryBuilder('stats')
                .where('stats.userId IN (:...userIds)', {userIds})
                .getMany();
            const userStatsMap = DataLoaderHelper.createMap<number, UserStatsEntity>();
            for (const stats of userStats) {
                userStatsMap.add(stats.userId, stats);
            }
            return userStatsMap.getAll(userIds);
        })
    }

}
