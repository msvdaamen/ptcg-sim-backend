import {Injectable} from "@nestjs/common";
import {OrderSuccessRepository} from "./order-success.repository";

@Injectable()
export class OrdersSuccessService {

    constructor(
        private readonly oderSuccessRepository: OrderSuccessRepository
    ) {
    }
}
