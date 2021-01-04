import {Inject, Injectable, Scope} from "@nestjs/common";
import * as DataLoader from "dataloader";
import {ImageEntity} from "../images/entities/image.entity";
import {getRepository} from "typeorm";
import {CardEntity} from "./entities/card.entity";
import {DataLoaderHelper} from "../../common/helpers/data-loader.helper";
import {REQUEST} from "@nestjs/core";
import {UserEntity} from "../users/entities/user.entity";


@Injectable({
    scope: Scope.REQUEST
})
export class CardsDataLoader {

    private _imageDataLoader: DataLoader<number, ImageEntity>;
    private _imageHResDataLoader: DataLoader<number, ImageEntity>;
    private _hasCardDataLoader: DataLoader<{userId: number, cardId: number}, boolean>;

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

    get hasCard() {
        if (!this._hasCardDataLoader) {
            this.createHasCardDataLoader();
        }
        return this._hasCardDataLoader;
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

    private createHasCardDataLoader() {
        this._hasCardDataLoader = new DataLoader(async (payload) => {
            console.log(payload);

            return payload.map(() => false);
        }, {
            cacheKeyFn: key => {
                return `${key.userId}|${key.cardId}`
            }
        });
    }
}
