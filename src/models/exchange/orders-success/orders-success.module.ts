import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderSuccessEntity} from "./entities/order-success.entity";
import {OrderSuccessRepository} from "./order-success.repository";
import {OrdersSuccessService} from "./orders-success.service";
import {CqrsModule} from "@nestjs/cqrs";
import {CreateOrderSuccessCommandHandler} from "./commands/create-order-succes/create-order-success.command-handler";

const commandHandlers = [
    CreateOrderSuccessCommandHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderSuccessEntity, OrderSuccessRepository]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        OrdersSuccessService
    ]
})
export class OrdersSuccessModule {}
