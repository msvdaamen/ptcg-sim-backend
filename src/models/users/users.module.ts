import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {UserRepository} from "./user.repository";
import {UserHasCardEntity} from "./entities/user-has-card.entity";
import {CqrsModule} from "@nestjs/cqrs";
import {UserSaga} from "./user.saga";
import {AddCoinsToUserCommandHandler} from "./commands/add-coins/add-coins-to-user.command-handler";

const commandHandlers = [
    AddCoinsToUserCommandHandler
]

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserRepository, UserHasCardEntity]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        UserSaga
    ]
})
export class UsersModule {

}
