import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {UserRepository} from "./user.repository";
import {UserHasCardEntity} from "./entities/user-has-card.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserRepository, UserHasCardEntity])
    ]
})
export class UsersModule {

}
