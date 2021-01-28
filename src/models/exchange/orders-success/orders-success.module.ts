import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderSuccessEntity} from "./entities/order-success.entity";
import {OrderSuccessRepository} from "./order-success.repository";
import {OrdersSuccessService} from "./orders-success.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderSuccessEntity, OrderSuccessRepository])
    ],
    providers: [
        OrdersSuccessService
    ]
})
export class OrdersSuccessModule {}
