import {Injectable, Scope} from "@nestjs/common";
import * as DataLoader from "dataloader";
import {CardEntity} from "../../cards/entities/card.entity";
import {getRepository} from "typeorm";
import {OrderSuccessEntity} from "../orders-success/entities/order-success.entity";
import {DataLoaderHelper} from "../../../common/helpers/data-loader.helper";
import {OrderEntity} from "./entities/order.entity";

@Injectable({
    scope: Scope.REQUEST
})
export class OrderDataLoader {

    private _cardDataLoader: DataLoader<number, CardEntity>;

    get card() {
        if (!this._cardDataLoader) {
            this.createCardDataLoader();
        }
        return this._cardDataLoader;
    }

    private createCardDataLoader(): void {
        this._cardDataLoader = new DataLoader<number, CardEntity>(async (orderIds: number[]) => {
            const orders = await getRepository(OrderEntity)
                .createQueryBuilder('order')
                .leftJoinAndSelect('order.card', 'card')
                .where('order.id IN (:...ids)', {ids: orderIds})
                .getMany();
            const cardMap = DataLoaderHelper.createMap<number, CardEntity>();
            for (const order of orders) {
                cardMap.add(order.id, order.card);
            }
            return cardMap.getAll(orderIds);
        })
    }
}
