import {OrderEntity} from "../../entities/order.entity";

export class OrderSoldEvent {

    constructor(
        public readonly order: OrderEntity,
        public readonly buyerUserId: number,
        public readonly sellerUserId: number
    ) {
    }
}
