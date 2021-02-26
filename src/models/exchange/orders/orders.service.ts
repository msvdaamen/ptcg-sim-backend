import {Injectable} from "@nestjs/common";
import {OrderPaginationModel} from "../../../common/graphql/models/order-pagination.model";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {FindOrdersPaginatedQuery} from "./queries/find-order-paginated/find-orders-paginated.query";
import {PaginationInterface} from "../../../common/interfaces/common/pagination.interface";
import {MyOrdersPaginatedQuery} from "./queries/my-orders-paginated/my-orders-paginated.query";
import {CreateOrderCommand} from "./commands/create-order/create-order.command";
import {CancelOrderCommand} from "./commands/cancel-order/cancel.-order.command";
import {BuyOrderCommand} from "./commands/buy-order/buy-order.command";
import {OrderEntity} from "./entities/order.entity";
import {FindOneOrderQuery} from "./queries/find-one-order/find-one-order.query";

@Injectable()
export class OrdersService {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {
    }

    ordersPaginated(userId: number, pagination: PaginationInterface): Promise<OrderPaginationModel> {
        return this.queryBus.execute(
            new FindOrdersPaginatedQuery(userId, pagination)
        );
    }

    myOrdersPaginated(userId: number, pagination: PaginationInterface) {
        return this.queryBus.execute(
            new MyOrdersPaginatedQuery(userId, pagination)
        );
    }

    order(orderId: number): Promise<OrderEntity> {
        return this.queryBus.execute(
            new FindOneOrderQuery(orderId)
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
