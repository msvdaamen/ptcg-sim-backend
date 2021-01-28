import {Args, Query, Resolver} from "@nestjs/graphql";
import {OrderEntity} from "./entities/order.entity";
import {OrdersService} from "./orders.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../common/guards/jwt-auth.guard";
import {OrderPaginationModel} from "../../../common/graphql/models/order-pagination.model";
import {CurrentUser} from "../../../common/decorators/current-user";
import {PaginationArgs} from "../../../common/graphql/args/pagination.args";
import {UserEntity} from "../../users/entities/user.entity";

@UseGuards(JwtAuthGuard)
@Resolver(OrderEntity)
export class OrdersResolver {

    constructor(
        private readonly ordersService: OrdersService
    ) {
    }

    @Query(() => OrderPaginationModel)
    orders(
        @Args('pagination') {page, amount}: PaginationArgs
    ) {
        return this.ordersService.ordersPaginated(page, amount);
    }

    @Query(() => OrderPaginationModel)
    myOrders(
        @CurrentUser() user: UserEntity,
        @Args('pagination') {page, amount}: PaginationArgs
    ) {
        return this.ordersService.myOrdersPaginated(user.id, page, amount);
    }
}
