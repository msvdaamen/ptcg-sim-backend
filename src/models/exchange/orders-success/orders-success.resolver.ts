import {OrdersSuccessService} from "./orders-success.service";
import {Resolver} from "@nestjs/graphql";
import {OrderSuccessEntity} from "./entities/order-success.entity";

@Resolver(OrderSuccessEntity)
export class OrdersSuccessResolver {

    constructor(
        private readonly ordersSuccessService: OrdersSuccessService
    ) {
    }
}
