import {Injectable} from "@nestjs/common";
import {CardRepository} from "../cards/card.repository";
import {RarityRepository} from "../rarities/rarity.repository";

@Injectable()
export class PackOpeningService {

    constructor(
        private readonly cardRepository: CardRepository,
        private readonly rarityRepository: RarityRepository
    ) {
    }

    async open() {
        const rarities = await this.rarityRepository
            .createQueryBuilder('rarities')
            .orderBy('rarities.value', 'ASC')
            .getMany();

        const cardTypes: {[rarityId: number]: number} = {};
        for (let i = 0; i < 12; i++) {
            for (const rarity of rarities) {
                const rand = Math.random();
                if (rand < rarity.value) {
                    if (!cardTypes.hasOwnProperty(rarity.id)) {
                        cardTypes[rarity.id] = 0;
                    }
                    cardTypes[rarity.id]++;
                    break;
                }
            }
        }
        
        const cardQueries = [];
        Object.entries(cardTypes).forEach(([rarityId, amount]) => {
            const query = this.cardRepository.createQueryBuilder('cards')
                .where('cards.rarityId = :rarityId', {rarityId})
                .limit(amount)
                .getMany();
            cardQueries.push(query);
        });
        const allCards = await Promise.all(cardQueries);
        const cards = [];
        for (const allCard of allCards) {
            cards.push(...allCard);
        }

        return cards;
    }
}
