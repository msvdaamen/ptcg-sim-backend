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
import {CqrsModule} from "@nestjs/cqrs";
import {FindCardsPaginatedQueryHandler} from "./queries/find-all-paginated/find-cards-paginated.query-handler";
import {FindOneCardQueryHandler} from "./queries/find-one/find-one-card.query-handler";
import {MyCardsQueryHandler} from "./queries/my-cards/my-cards.query-handler";
import {QuickSellCommandHandler} from "./commands/quick-sell/quick-sell.command-handler";

const commandHandlers = [
    QuickSellCommandHandler
]

const queryHandlers = [
    FindCardsPaginatedQueryHandler,
    FindOneCardQueryHandler,
    MyCardsQueryHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity, CardRepository, UserHasCardRepository, OrderRepository, UserRepository]),
        CqrsModule
    ],
    providers: [
        ...queryHandlers,
        ...commandHandlers,
        CardsService,
        CardsResolver,
        CardsDataLoader
    ]
})
export class CardsModule {

}
