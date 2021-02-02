import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddUserOpenedPackAmountCommand} from "./add-user-opened-pack-amount.command";
import {UserStatsRepository} from "../../repositories/user-stats.repository";
import {UserStatsEntity} from "../../entities/user-stats.entity";

@CommandHandler(AddUserOpenedPackAmountCommand)
export class AddUserOpenedPackAmountCommandHandler implements ICommandHandler<AddUserOpenedPackAmountCommand> {

    constructor(
        private readonly userStatsRepository: UserStatsRepository
    ) {
    }

    async execute({userId}: AddUserOpenedPackAmountCommand): Promise<any> {
        await this.userStatsRepository.createQueryBuilder('user')
            .update(UserStatsEntity)
            .set({
                packsOpened: () => `packs_opened + 1`
            })
            .where('user_id = :userId', {userId})
            .execute();
    }
}
