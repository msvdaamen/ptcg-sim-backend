import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
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
        const cards = await this.userHasCardRepository.createQueryBuilder('userHasCard')
            .select(['userHasCard.id as id'])
            .where('userHasCard.userId = :userId AND userHasCard.cardId = :cardId', {userId, cardId})
            .limit(amount)
            .getRawMany();
        const ids = cards.map(card => card.id);
        if (!ids.length) {
            throw new HttpException('No cards are sold',  HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const [
            {affected},
            card
        ] = await Promise.all([
            this.userHasCardRepository.delete(ids),
            this.cardRepository.findOne({id: cardId})
        ]);
        if (!affected) {
            throw new HttpException('No cards are sold',  HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const coins = card.price * affected;
        this.eventBus.publish(
            new UserSoldCardEvent(userId, coins)
        );
        return card;
    }

}
