import {Injectable} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {MyOrderSuccessQuery} from "./queries/my-order-success/my-order-success.query";

@Injectable()
export class OrdersSuccessService {

    constructor(
        private readonly queryBus: QueryBus
    ) {
    }

    myOrderSuccess(userId: number) {
        return this.queryBus.execute(
            new MyOrderSuccessQuery(userId)
        );
    }
}
