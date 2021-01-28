import {Field, ObjectType} from "@nestjs/graphql";
import {PaginationModel} from "./pagination.model";
import {OrderEntity} from "../../../models/exchange/orders/entities/order.entity";

@ObjectType()
export class OrderPaginationModel {

    @Field(() => [OrderEntity])
    orders: OrderEntity[];

    @Field(() => PaginationModel)
    pagination: PaginationModel;

}
