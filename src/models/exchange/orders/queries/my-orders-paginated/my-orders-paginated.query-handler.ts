import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {MyOrdersPaginatedQuery} from "./my-orders-paginated.query";
import {PaginationModel} from "../../../../../common/graphql/models/pagination.model";
import {OrderRepository} from "../../order.repository";

@QueryHandler(MyOrdersPaginatedQuery)
export class MyOrdersPaginatedQueryHandler implements IQueryHandler<MyOrdersPaginatedQuery> {

    constructor(
        private readonly orderRepository: OrderRepository
    ) {
    }

    async execute({pagination: {page, amount}, userId}: MyOrdersPaginatedQuery): Promise<any> {
        const query = this.orderRepository
            .createQueryBuilder('orders')
            .where('orders.userId = :userId', {userId})
            .orderBy('orders.expire_at', "ASC");
        const [
            orders,
            total
        ] = await Promise.all([
            query.offset((page - 1) * amount).limit(amount).getMany(),
            query.getCount()
        ]);
        const pagination = PaginationModel.create(
            total,
            amount,
            page,
            orders.length
        );
        return {
            orders,
            pagination
        };
    }

}
