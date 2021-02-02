import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderSuccessEntity} from "./entities/order-success.entity";
import {OrderSuccessRepository} from "./order-success.repository";
import {OrdersSuccessService} from "./orders-success.service";
import {CqrsModule} from "@nestjs/cqrs";
import {CreateOrderSuccessCommandHandler} from "./commands/create-order-succes/create-order-success.command-handler";
import {MyOrderSuccessQueryHandler} from "./queries/my-order-success/my-order-success.query-handler";
import {OrdersSuccessDataLoader} from "./orders-success.data-loader";
import {OrdersSuccessResolver} from "./orders-success.resolver";

const commandHandlers = [
    CreateOrderSuccessCommandHandler
];
const queryHandlers = [
  MyOrderSuccessQueryHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderSuccessEntity, OrderSuccessRepository]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        OrdersSuccessService,
        OrdersSuccessDataLoader,
        OrdersSuccessResolver
    ]
})
export class OrdersSuccessModule {}
