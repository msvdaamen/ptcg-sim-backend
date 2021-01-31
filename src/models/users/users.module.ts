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

const commandHandlers = [
    AddCoinsToUserCommandHandler
];

const eventHandlers = [
    UserBalanceChangedEventHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserRepository, UserHasCardEntity]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        ...eventHandlers,
        UserSaga,
        UserResolver
    ]
})
export class UsersModule {

}
