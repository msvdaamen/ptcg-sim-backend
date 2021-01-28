import {Module} from "@nestjs/common";
import {OrdersModule} from "./orders/orders.module";
import {OrdersSuccessModule} from "./orders-success/orders-success.module";

@Module({
    imports: [
        OrdersModule,
        OrdersSuccessModule
    ]
})
export class ExchangeModule {}
