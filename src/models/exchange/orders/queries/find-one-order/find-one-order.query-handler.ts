import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindOneOrderQuery} from "./find-one-order.query";
import {OrderRepository} from "../../order.repository";

@QueryHandler(FindOneOrderQuery)
export class FindOneOrderQueryHandler implements IQueryHandler<FindOneOrderQuery> {

    constructor(
        private readonly orderRepository: OrderRepository
    ) {
    }

    execute({orderId}: FindOneOrderQuery): Promise<any> {
        return this.orderRepository.findOneOrFail({id: orderId});
    }

}
