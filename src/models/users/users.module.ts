import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {UserRepository} from "./user.repository";
import {UserHasCardEntity} from "./entities/user-has-card.entity";
import {CqrsModule} from "@nestjs/cqrs";
import {UserSaga} from "./user.saga";
import {AddCoinsToUserCommandHandler} from "./commands/add-coins/add-coins-to-user.command-handler";
import {UserResolver} from "./user.resolver";
import {UserBalanceChangedEventHandler} from "./events/user-balance-changed/user-balance-changed.event-handler";
import {AddUserOpenedPackAmountCommandHandler} from "./commands/add-user-opened-pack-amount/add-user-opened-pack-amount.command-handler";
import {UserStatsEntity} from "./entities/user-stats.entity";
import {UserStatsRepository} from "./repositories/user-stats.repository";
import {UserDataLoader} from "./user.data-loader";

const commandHandlers = [
    AddCoinsToUserCommandHandler,
    AddUserOpenedPackAmountCommandHandler
];

const eventHandlers = [
    UserBalanceChangedEventHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserStatsEntity, UserRepository, UserHasCardEntity, UserStatsRepository]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        ...eventHandlers,
        UserDataLoader,
        UserSaga,
        UserResolver
    ]
})
export class UsersModule {

}
