import {Injectable, Scope} from "@nestjs/common";
import * as DataLoader from "dataloader";
import {ImageEntity} from "../images/entities/image.entity";
import {getRepository} from "typeorm";
import {CardEntity} from "./entities/card.entity";
import {DataLoaderHelper} from "../../common/helpers/data-loader.helper";
import {UserHasCardEntity} from "../users/entities/user-has-card.entity";
import {RarityEntity} from "../rarities/entities/rarity.entity";
import {RarityRepository} from "../rarities/rarity.repository";

@Injectable({
    scope: Scope.REQUEST
})
export class CardsDataLoader {

    private _imageDataLoader: DataLoader<number, ImageEntity>;
    private _imageHResDataLoader: DataLoader<number, ImageEntity>;
    private _rarityDataLoader: DataLoader<number, RarityEntity>;

    private _hasCardDataLoader: DataLoader<number, boolean>;
    private _cardAmountDataLoader: DataLoader<number, number>;

    get image() {
        if (!this._imageDataLoader) {
            this.createImageDataLoader();
        }
        return this._imageDataLoader;
    }

    get imageHRes() {
        if (!this._imageHResDataLoader) {
            this.createHResImageDataLoader();
        }
        return this._imageHResDataLoader;
    }

    get rarity() {
        if (!this._rarityDataLoader) {
            this.createRarityDataLoader();
        }
        return this._rarityDataLoader;
    }

    hasCard(userId: number) {
        if (!this._hasCardDataLoader) {
            this.createHasCardDataLoader(userId);
        }
        return this._hasCardDataLoader;
    }

    amount(userId: number) {
        if (!this._cardAmountDataLoader) {
            this.createCardAmountDataLoader(userId);
        }
        return this._cardAmountDataLoader;
    }

    private createImageDataLoader() {
        this._imageDataLoader = new DataLoader<number, ImageEntity>(async (cardsId: number[]) => {
            const cards = await getRepository(CardEntity).createQueryBuilder('cards')
                .leftJoinAndSelect('cards.image', 'image')
                .where('cards.id IN(:...ids)', {ids: cardsId})
                .getMany();
            const cardToImage = DataLoaderHelper.createMap<number, ImageEntity>();
            for (const card of cards) {
                if (card.image) {
                    cardToImage.add(card.id, card.image);
                }
            }
            return cardToImage.getAll(cardsId);
        });
    }

    private createHResImageDataLoader() {
        this._imageHResDataLoader = new DataLoader<number, ImageEntity>(async (cardsId: number[]) => {
            const cards = await getRepository(CardEntity).createQueryBuilder('cards')
                .leftJoinAndSelect('cards.imageHRes', 'imageHRes')
                .where('cards.id IN(:...ids)', {ids: cardsId})
                .getMany();
            const cardToImage = DataLoaderHelper.createMap<number, ImageEntity>();
            for (const card of cards) {
                if (card.imageHRes) {
                    cardToImage.add(card.id, card.imageHRes);
                }
            }
            return cardToImage.getAll(cardsId);
        });
    }

    private createRarityDataLoader() {
        this._rarityDataLoader = new DataLoader<number, RarityEntity>(async (cardsId: number[]) => {
            const cards = await getRepository(CardEntity).createQueryBuilder('cards')
                .leftJoinAndSelect('cards.rarity', 'rarity')
                .where('cards.id IN(:...ids)', {ids: cardsId})
                .getMany();
            const cardToRarity = DataLoaderHelper.createMap<number, RarityEntity>();
            for (const card of cards) {
                cardToRarity.add(card.id, card.rarity);
            }
            return cardToRarity.getAll(cardsId);
        });
    }

    private createHasCardDataLoader(userId: number) {
        this._hasCardDataLoader = new DataLoader(async (cardIds: number[]) => {
            const cards = await getRepository(UserHasCardEntity)
                .createQueryBuilder('userHasCard')
                .where('userHasCard.userId = :userId and userHasCard.cardId IN (:...cardIds)', {userId, cardIds})
                .groupBy('userHasCard.cardId')
                .getMany();

            const cardHasUserMap = DataLoaderHelper.createMap<number, boolean>(false);
            for (const card of cards) {
                cardHasUserMap.add(card.cardId, true);
            }
            return cardHasUserMap.getAll(cardIds);
        });
    }

    private createCardAmountDataLoader(userId: number) {
        this._cardAmountDataLoader = new DataLoader(async (cardIds: number[]) => {
            const cards = await getRepository(UserHasCardEntity)
                .createQueryBuilder('userHasCard')
                .select('userHasCard.cardId as cardId, COUNT(userHasCard.cardId) as amount')
                .where('userHasCard.userId = :userId and userHasCard.cardId IN (:...cardIds)', {userId, cardIds})
                .groupBy('userHasCard.cardId')
                .execute();

            const cardHasUserMap = DataLoaderHelper.createMap<number, number>(0);
            for (const card of cards) {
                cardHasUserMap.add(card.cardId, card.amount);
            }
            return cardHasUserMap.getAll(cardIds);
        });
    }
}
