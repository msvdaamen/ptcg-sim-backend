import {Injectable, Scope} from "@nestjs/common";
import * as DataLoader from "dataloader";
import {getRepository} from "typeorm";
import {RarityEntity} from "./entities/rarity.entity";
import {CardEntity} from "../cards/entities/card.entity";
import {DataLoaderHelper} from "../../common/helpers/data-loader.helper";;

@Injectable({
    scope: Scope.REQUEST
})
export class RarityDataLoader {

    private _cardAmount: DataLoader<number, number>
    private _cardsOwned: DataLoader<number, number>

    get cardAmount() {
        if (!this._cardAmount) {
            this.createCardAmountDataLoader();
        }
        return this._cardAmount;
    }

    cardsOwned(userId: number) {
        if (!this._cardsOwned) {
            this.createCardsOwnedDataLoader(userId);
        }
        return this._cardsOwned;
    }

    private createCardAmountDataLoader(): void {
        this._cardAmount = new DataLoader<number, number>(async (rarityIds: number[]) => {
            const rarities = await getRepository(RarityEntity)
                .createQueryBuilder('rarities')
                .select('rarities.id, COUNT(cards.id) as amount')
                .leftJoin('rarities.cards', 'cards')
                .groupBy('rarities.id')
                .getRawMany();
            const raritiesMap = DataLoaderHelper.createMap<number, number>(0);
            for (const rarity of rarities) {
                raritiesMap.add(rarity.id, rarity.amount)
            }
            return raritiesMap.getAll(rarityIds);
        });
    }

    private createCardsOwnedDataLoader(userId: number): void {
        this._cardsOwned = new DataLoader<number, number>(async (rarityIds: number[]) => {
            const rarities = await getRepository(CardEntity)
                .createQueryBuilder('cards')
                .select('cards.rarityId as id, COUNT(DISTINCT(cards.id)) as amount')
                .innerJoin('user_has_card', 'userHasCard', 'userHasCard.card_id = cards.id and userHasCard.user_id = :userId', {userId})
                .where('cards.rarityId IN (:...rarityIds)', {rarityIds})
                .groupBy('cards.rarityId')
                .getRawMany();

            const raritiesMap = DataLoaderHelper.createMap<number, number>(0);
            for (const rarity of rarities) {
                raritiesMap.add(rarity.id, rarity.amount)
            }
            return raritiesMap.getAll(rarityIds);
        });
    }

}
