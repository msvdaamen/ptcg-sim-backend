import {EntityRepository, Repository} from "typeorm";
import {OrderSuccessEntity} from "./entities/order-success.entity";

@EntityRepository(OrderSuccessEntity)
export class OrderSuccessRepository extends Repository<OrderSuccessEntity> {

}
