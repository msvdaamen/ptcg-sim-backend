import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {MyOrderSuccessQuery} from "./my-order-success.query";
import {OrderSuccessRepository} from "../../order-success.repository";

@QueryHandler(MyOrderSuccessQuery)
export class MyOrderSuccessQueryHandler implements IQueryHandler<MyOrderSuccessQuery> {

    constructor(
        private readonly orderSuccessRepository: OrderSuccessRepository
    ) {
    }

    execute({userId}: MyOrderSuccessQuery): Promise<any> {
        return this.orderSuccessRepository.find({userId})
    }

}
