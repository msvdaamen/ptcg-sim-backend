import {CommandHandler, EventBus, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {QuickSellCommand} from "./quick-sell.command";
import {HttpException, HttpStatus} from "@nestjs/common";
import {UserHasCardRepository} from "../../../users/user-has-card.repository";
import {CardRepository} from "../../card.repository";
import {UserSoldCardEvent} from "../../../users/events/user-sold-card/user-sold-card.event";
import {CardEntity} from "../../entities/card.entity";

@CommandHandler(QuickSellCommand)
export class QuickSellCommandHandler implements ICommandHandler<QuickSellCommand> {

    constructor(
        private readonly userHasCardRepository: UserHasCardRepository,
        private readonly cardRepository: CardRepository,
        private readonly eventBus: EventBus
    ) {
    }

    async execute({userId, cardId, amount}: QuickSellCommand): Promise<CardEntity> {
        const value = 1;
        const [
            {affected},
            card
        ] = await Promise.all([
            this.userHasCardRepository
                .createQueryBuilder('userHasCard')
                .where('userHasCard.userId = :userId AND userHasCard.cardId = :cardId', {userId, cardId})
                .limit(amount)
                .delete()
                .execute(),
            this.cardRepository.findOne({id: cardId})
        ]);
        if (!affected) {
            throw new HttpException('No cards are sold',  HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const coins = value * affected;
        this.eventBus.publish(
            new UserSoldCardEvent(userId, coins)
        );
        return card;
    }

}
