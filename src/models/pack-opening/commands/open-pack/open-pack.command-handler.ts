import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {OpenPackCommand} from "./open-pack.command";
import {NumberUtil} from "../../../../common/helpers/number.util";
import {CardEntity} from "../../../cards/entities/card.entity";
import {UserHasCardEntity} from "../../../users/entities/user-has-card.entity";
import {RarityRepository} from "../../../rarities/rarity.repository";
import {CardRepository} from "../../../cards/card.repository";
import {UserHasCardRepository} from "../../../users/user-has-card.repository";

@CommandHandler(OpenPackCommand)
export class OpenPackCommandHandler implements ICommandHandler<OpenPackCommand> {

    constructor(
        private readonly rarityRepository: RarityRepository,
        private readonly cardRepository: CardRepository,
        private readonly userHasCardRepository: UserHasCardRepository
    ) {
    }

    async execute({userId}: OpenPackCommand): Promise<any> {
        const rarities = await this.rarityRepository
            .createQueryBuilder('rarities')
            .orderBy('rarities.weight', 'ASC')
            .getMany();

        const totalWeight = rarities.reduce((weight, rarity) => {
            weight += rarity.weight;
            return weight;
        }, 0);

        const lootTable = new Array(totalWeight);

        let currentIndex = 0;
        rarities.forEach((rarity) => {
            for (let i = 0; i < rarity.weight; i++) {
                lootTable[currentIndex] = rarity.id;
                currentIndex++;
            }
        });

        const cardTypes: {[rarityId: number]: number} = {};
        for (let i = 0; i < 12; i++) {
            const randomIndex = NumberUtil.randomBetween(0, lootTable.length - 1);
            const rarity = lootTable[randomIndex];
            if (!cardTypes.hasOwnProperty(rarity)) {
                cardTypes[rarity] = 0;
            }
            cardTypes[rarity]++;
        }

        const cardQueries = Object.entries(cardTypes).map(([rarityId, amount]) => {
            return this.cardRepository.createQueryBuilder('cards')
                .where('cards.rarityId = :rarityId', {rarityId})
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
        return cards;
    }

}
