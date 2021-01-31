import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import {AddCoinToUserCommand} from "./add-coin-to-user.command";
import {UserRepository} from "../../user.repository";
import {UserEntity} from "../../entities/user.entity";
import {UserBalanceChangedEvent} from "../../events/user-balance-changed/user-balance-changed.event";

@CommandHandler(AddCoinToUserCommand)
export class AddCoinsToUserCommandHandler implements ICommandHandler<AddCoinToUserCommand> {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly eventBus: EventBus
    ) {
    }

    async execute({userId, coins}: AddCoinToUserCommand): Promise<any> {
        await this.userRepository.createQueryBuilder('user')
            .update(UserEntity)
            .set({
                balance: () => `balance + ${coins}`
            })
            .where('id = :userId', {userId})
            .execute();
        const user = await this.userRepository.findOne({id: userId});
        this.eventBus.publish(
            new UserBalanceChangedEvent(user.id, user.balance)
        );
    }
}
