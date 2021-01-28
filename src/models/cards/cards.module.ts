import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardEntity} from "./entities/card.entity";
import {CardRepository} from "./card.repository";
import {CardsService} from "./cards.service";
import {CardsResolver} from "./cards.resolver";
import {CardsDataLoader} from "./cards.data-loader";
import {UserHasCardRepository} from "../users/user-has-card.repository";
import {OrderRepository} from "../exchange/orders/order.repository";
import {UserRepository} from "../users/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity, CardRepository, UserHasCardRepository, OrderRepository, UserRepository])
    ],
    providers: [
        CardsService,
        CardsResolver,
        CardsDataLoader
    ]
})
export class CardsModule {

}
