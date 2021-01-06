import {Injectable} from "@nestjs/common";
import {CardRepository} from "../cards/card.repository";
import {RarityRepository} from "../rarities/rarity.repository";
import {UserHasCardRepository} from "../users/user-has-card.repository";
import {CardEntity} from "../cards/entities/card.entity";
import {UserHasCardEntity} from "../users/entities/user-has-card.entity";

@Injectable()
export class PackOpeningService {

    constructor(
        private readonly cardRepository: CardRepository,
        private readonly userHasCardRepository: UserHasCardRepository,
        private readonly rarityRepository: RarityRepository
    ) {
    }

    async open(userId: number) {
        const rarities = await this.rarityRepository
            .createQueryBuilder('rarities')
            .orderBy('rarities.value', 'ASC')
            .getMany();

        const out = [];
        for (const rarity of rarities) {
            const change = rarity.value * 1000;
            for (let i = 0; i < change; i++) {
                out.push(rarity.id);
            }
        }

        const cardTypes: {[rarityId: number]: number} = {};
        for (let i = 0; i < 12; i++) {
            const id = out[Math.floor(Math.random() * out.length)];
            if (!cardTypes.hasOwnProperty(id)) {
                cardTypes[id] = 0;
            }
            cardTypes[id]++;
        }

        const cardQueries: Promise<CardEntity[]>[] = [];
        Object.entries(cardTypes).forEach(([rarityId, amount]) => {
            const query = this.cardRepository.createQueryBuilder('cards')
                .where('cards.rarityId = :rarityId', {rarityId})
                .limit(amount)
                .orderBy('RAND()')
                .getMany();
            cardQueries.push(query);
        });
        const allCards = await Promise.all(cardQueries);
        const cards: CardEntity[] = [];

        for (const allCard of allCards) {
            cards.push(...allCard);
        }

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
