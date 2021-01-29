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

const commandHandlers = [
    CreateOrderCommandHandler
];

const queryHandlers = [
  FindOrdersPaginatedQueryHandler,
    MyOrdersPaginatedQueryHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, OrderRepository, CardRepository, UserHasCardRepository]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        OrdersService,
        OrdersResolver
    ]
})
export class OrdersModule {}
