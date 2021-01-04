import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {UserRepository} from "./user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserRepository])
    ]
})
export class UsersModule {

}
