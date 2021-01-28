import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "./entities/order.entity";
import {OrdersService} from "./orders.service";
import {OrderRepository} from "./order.repository";
import {OrdersResolver} from "./orders.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, OrderRepository])
    ],
    providers: [
        OrdersService,
        OrdersResolver
    ]
})
export class OrdersModule {}
