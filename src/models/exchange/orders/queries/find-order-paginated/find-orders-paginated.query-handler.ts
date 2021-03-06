import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOrdersPaginatedQuery} from "./find-orders-paginated.query";
import {PaginationModel} from "../../../../../common/graphql/models/pagination.model";
import {OrderRepository} from "../../order.repository";

@QueryHandler(FindOrdersPaginatedQuery)
export class FindOrdersPaginatedQueryHandler implements IQueryHandler<FindOrdersPaginatedQuery> {

    constructor(
        private readonly orderRepository: OrderRepository
    ) {
    }

    async execute({userId, pagination: {page, amount}}: FindOrdersPaginatedQuery): Promise<any> {
        const query = this.orderRepository
            .createQueryBuilder('orders')
            .where('orders.userId <> :userId', {userId})
            .orderBy('orders.expire_date', "ASC");
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
