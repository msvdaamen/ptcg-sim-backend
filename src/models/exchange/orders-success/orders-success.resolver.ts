import {OrdersSuccessService} from "./orders-success.service";
import {Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {OrderSuccessEntity} from "./entities/order-success.entity";
import {CurrentUser} from "../../../common/decorators/current-user";
import {UserEntity} from "../../users/entities/user.entity";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../common/guards/jwt-auth.guard";
import {OrdersSuccessDataLoader} from "./orders-success.data-loader";
import {CardEntity} from "../../cards/entities/card.entity";

@UseGuards(JwtAuthGuard)
@Resolver(OrderSuccessEntity)
export class OrdersSuccessResolver {

    constructor(
        private readonly ordersSuccessService: OrdersSuccessService,
        private readonly orderSuccessDataLoader: OrdersSuccessDataLoader
    ) {
    }

    @Query(() => [OrderSuccessEntity])
    myOrderSuccess(
        @CurrentUser() user: UserEntity
    ) {
        return this.ordersSuccessService.myOrderSuccess(user.id);
    }

    @ResolveField(() => CardEntity)
    card(
        @Parent() orderSuccess: OrderSuccessEntity
    ) {
        return this.orderSuccessDataLoader.card.load(orderSuccess.id);
    }


}
