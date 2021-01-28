import {Injectable} from "@nestjs/common";
import {OrderRepository} from "./order.repository";
import {PaginationModel} from "../../../common/graphql/models/pagination.model";
import {OrderPaginationModel} from "../../../common/graphql/models/order-pagination.model";

@Injectable()
export class OrdersService {

    constructor(
        private readonly orderRepository: OrderRepository
    ) {
    }

    async ordersPaginated(page: number, amount: number): Promise<OrderPaginationModel> {
        const query = this.orderRepository
            .createQueryBuilder('orders')
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

    async myOrdersPaginated(userId: number, page: number, amount: number) {
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
