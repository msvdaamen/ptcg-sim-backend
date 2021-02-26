import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "./entities/order.entity";
import {OrdersService} from "./orders.service";
import {OrderRepository} from "./order.repository";
import {OrdersResolver} from "./orders.resolver";
import {CreateOrderCommandHandler} from "./commands/create-order/create-order.command-handler";
import {CqrsModule} from "@nestjs/cqrs";
import {CardRepository} from "../../cards/card.repository";
import {UserHasCardRepository} from "../../users/user-has-card.repository";
import {FindOrdersPaginatedQueryHandler} from "./queries/find-order-paginated/find-orders-paginated.query-handler";
import {MyOrdersPaginatedQueryHandler} from "./queries/my-orders-paginated/my-orders-paginated.query-handler";
import {CancelOrderCommandHandler} from "./commands/cancel-order/cancel-order.command-handler";
import {UserRepository} from "../../users/user.repository";
import {OrdersSaga} from "./orders.saga";
import {BuyOrderCommandHandler} from "./commands/buy-order/buy-order.command-handler";
import {OrderDataLoader} from "./order.data-loader";
import {FindOneOrderQueryHandler} from "./queries/find-one-order/find-one-order.query-handler";

const commandHandlers = [
    CreateOrderCommandHandler,
    CancelOrderCommandHandler,
    BuyOrderCommandHandler
];

const queryHandlers = [
    FindOrdersPaginatedQueryHandler,
    MyOrdersPaginatedQueryHandler,
    FindOneOrderQueryHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, OrderRepository, CardRepository, UserHasCardRepository, UserRepository]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        OrdersService,
        OrdersResolver,
        OrdersSaga,
        OrderDataLoader
    ]
})
export class OrdersModule {}
