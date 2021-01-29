import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddCoinToUserCommand} from "./add-coin-to-user.command";
import {UserRepository} from "../../user.repository";

@CommandHandler(AddCoinToUserCommand)
export class AddCoinsToUserCommandHandler implements ICommandHandler<AddCoinToUserCommand> {

    constructor(
        private readonly userRepository: UserRepository
    ) {
    }

    async execute({userId, coins}: AddCoinToUserCommand): Promise<any> {
        await this.userRepository.createQueryBuilder('user')
            .update()
            .set({
                balance: () => `balance + ${coins}`
            })
            .where('user.id = :userId', {userId})
            .execute();
    }
}
