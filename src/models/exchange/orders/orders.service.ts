import {Injectable} from "@nestjs/common";
import {OrderRepository} from "./order.repository";
import {OrderPaginationModel} from "../../../common/graphql/models/order-pagination.model";
import {QueryBus} from "@nestjs/cqrs";
import {FindOrdersPaginatedQuery} from "./queries/find-order-paginated/find-orders-paginated.query";
import {PaginationInterface} from "../../../common/interfaces/common/pagination.interface";
import {MyOrdersPaginatedQuery} from "./queries/my-orders-paginated/my-orders-paginated.query";

@Injectable()
export class OrdersService {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly orderRepository: OrderRepository
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

}
