import {OrderSuccessEntity} from "../../entities/order-success.entity";

export class OrderSuccessCreatedEvent {

    constructor(
        public readonly orderSuccess: OrderSuccessEntity
    ) {
    }
}
