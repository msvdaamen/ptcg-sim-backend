import {Injectable} from "@nestjs/common";
import {CardRepository} from "../cards/card.repository";
import {RarityRepository} from "../rarities/rarity.repository";
import {UserHasCardRepository} from "../users/user-has-card.repository";
import {CardEntity} from "../cards/entities/card.entity";
import {UserHasCardEntity} from "../users/entities/user-has-card.entity";
import {NumberUtil} from "../../common/helpers/number.util";

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

    private changeCalculations(lootTable: [], runs: number): {name: string, percentage: number}[] {
        const picked: {[key: string]: number} = {};
        for (let i = 0; i < runs; i++) {
            const randomIndex = NumberUtil.randomBetween(0, lootTable.length - 1);
            const rarity = lootTable[randomIndex];
            if (!picked.hasOwnProperty(rarity)) {
                picked[rarity] = 0;
            }
            picked[rarity]++;
        }

        const percentageArray = [];
        for (const key in picked) {
            const amount = picked[key];
            const percentage = Math.floor(amount / runs * 100 * 100) / 100;
            percentageArray.push({name: key, percentage});
        }
        const sortedArray = percentageArray.sort((a, b) => {
            const keyA = new Date(a.percentage);
            const keyB = new Date(b.percentage);
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
        return sortedArray;
    }
}
