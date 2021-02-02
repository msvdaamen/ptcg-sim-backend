import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import {OpenPackCommand} from "./open-pack.command";
import {CardEntity} from "../../../cards/entities/card.entity";
import {UserHasCardEntity} from "../../../users/entities/user-has-card.entity";
import {RarityRepository} from "../../../rarities/rarity.repository";
import {CardRepository} from "../../../cards/card.repository";
import {UserHasCardRepository} from "../../../users/user-has-card.repository";
import {NormalPack} from "../../../../common/models/packs/normal.pack";
import {PackType} from "../../../../common/models/packs/pack";
import {UserOpenedPackEvent} from "../../../cards/events/user-opened-pack/user-opened-pack.event";

@CommandHandler(OpenPackCommand)
export class OpenPackCommandHandler implements ICommandHandler<OpenPackCommand> {

    constructor(
        private readonly rarityRepository: RarityRepository,
        private readonly cardRepository: CardRepository,
        private readonly userHasCardRepository: UserHasCardRepository,
        private readonly eventBus: EventBus
    ) {
    }

    async execute({userId}: OpenPackCommand): Promise<any> {
        const pack = new NormalPack();

        const cardQueries = Object.entries(pack.packRate).filter(([type, amount]) => !!amount).map(([type, amount]: [PackType, number]) => {
            const ids = pack.getIds(type);
            return this.cardRepository.createQueryBuilder('cards')
                .where('cards.rarityId IN (:...ids)', {ids})
                .orderBy('RAND()')
                .limit(amount)
                .getMany();
        });
        const allCards = await Promise.all(cardQueries);

        const cards: CardEntity[] = allCards.flat();
        const userHasCards: UserHasCardEntity[] = [];
        for (const card of cards) {
            const uerHasCard = this.userHasCardRepository.create({
                cardId: card.id,
                userId
            });
            userHasCards.push(uerHasCard);
        }
        await this.userHasCardRepository.insert(userHasCards);
        this.eventBus.publish(
            new UserOpenedPackEvent(userId)
        );
        return cards;
    }

}
