import {Args, Int, Mutation, Query, Resolver} from "@nestjs/graphql";
import {OrderEntity} from "./entities/order.entity";
import {OrdersService} from "./orders.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../common/guards/jwt-auth.guard";
import {OrderPaginationModel} from "../../../common/graphql/models/order-pagination.model";
import {CurrentUser} from "../../../common/decorators/current-user";
import {PaginationArgs} from "../../../common/graphql/args/pagination.args";
import {UserEntity} from "../../users/entities/user.entity";
import {CreateOrderInput} from "./input/create-order.input";
import {CardEntity} from "../../cards/entities/card.entity";

@UseGuards(JwtAuthGuard)
@Resolver(OrderEntity)
export class OrdersResolver {

    constructor(
        private readonly ordersService: OrdersService
    ) {
    }

    @Query(() => OrderPaginationModel)
    orders(
        @CurrentUser() user: UserEntity,
        @Args('pagination') paginationArgs: PaginationArgs
    ) {
        return this.ordersService.ordersPaginated(user.id, paginationArgs);
    }

    @Query(() => OrderPaginationModel)
    myOrders(
        @CurrentUser() user: UserEntity,
        @Args('pagination') paginationArgs: PaginationArgs
    ) {
        return this.ordersService.myOrdersPaginated(user.id, paginationArgs);
    }

    @Mutation(() => CardEntity)
    createOrder(
        @CurrentUser() user: UserEntity,
        @Args('order') {cardId, price}: CreateOrderInput
    ) {
        return this.ordersService.create(user.id, cardId, price);
    }

    @Mutation(() => Boolean)
    cancelOrder(
        @CurrentUser() user: UserEntity,
        @Args('orderId', {type: () => Int}) orderId: number
    ) {
        return this.ordersService.cancel(user.id, orderId);
    }

    @Mutation(() => Boolean)
    buyOrder(
        @CurrentUser() user: UserEntity,
        @Args('orderId', {type: () => Int}) orderId: number
    ) {
        return this.ordersService.buy(user.id, orderId);
    }
}
