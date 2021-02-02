import {Injectable, Scope} from "@nestjs/common";
import * as DataLoader from "dataloader";
import {CardEntity} from "../../cards/entities/card.entity";
import {DataLoaderHelper} from "../../../common/helpers/data-loader.helper";
import {getRepository} from "typeorm";
import {OrderSuccessEntity} from "./entities/order-success.entity";

@Injectable({
    scope: Scope.REQUEST
})
export class OrdersSuccessDataLoader {

    private _cardDataLoader: DataLoader<number, CardEntity>;

    get card() {
        if (!this._cardDataLoader) {
            this.createCardDataLoader();
        }
        return this._cardDataLoader;
    }

    private createCardDataLoader(): void {
        this._cardDataLoader = new DataLoader<number, CardEntity>(async (orderSuccessIds: number[]) => {
            const orderSuccess = await getRepository(OrderSuccessEntity)
                .createQueryBuilder('orderSuccess')
                .leftJoinAndSelect('orderSuccess.card', 'card')
                .where('orderSuccess.id IN (:...ids)', {ids: orderSuccessIds})
                .getMany();
            const cardMap = DataLoaderHelper.createMap<number, CardEntity>();
            for (const order of orderSuccess) {
                cardMap.add(order.id, order.card);
            }
            return cardMap.getAll(orderSuccessIds);
        })
    }
}
