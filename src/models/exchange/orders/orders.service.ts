import {Injectable} from "@nestjs/common";
import {OrderPaginationModel} from "../../../common/graphql/models/order-pagination.model";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {FindOrdersPaginatedQuery} from "./queries/find-order-paginated/find-orders-paginated.query";
import {PaginationInterface} from "../../../common/interfaces/common/pagination.interface";
import {MyOrdersPaginatedQuery} from "./queries/my-orders-paginated/my-orders-paginated.query";
import {CreateOrderCommand} from "./commands/create-order/create-order.command";
import {CancelOrderCommand} from "./commands/cancel-order/cancel.-order.command";
import {BuyOrderCommand} from "./commands/buy-order/buy-order.command";

@Injectable()
export class OrdersService {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {
    }

    ordersPaginated(pagination: PaginationInterface): Promise<OrderPaginationModel> {
        return this.queryBus.execute(
            new FindOrdersPaginatedQuery(pagination)
        );
    }

    myOrdersPaginated(userId: number, pagination: PaginationInterface) {
        return this.queryBus.execute(
            new MyOrdersPaginatedQuery(userId, pagination)
        );
    }

    create(userId: number, cardId: number, price: number) {
        return this.commandBus.execute(
            new CreateOrderCommand(userId, cardId, price)
        );
    }

    cancel(userId: number, orderId: number) {
        this.commandBus.execute(
            new CancelOrderCommand(userId, orderId)
        );
        return true;
    }

    buy(userId: number, orderId:  number) {
        this.commandBus.execute(
            new BuyOrderCommand(userId, orderId)
        );
        return true;
    }
}
