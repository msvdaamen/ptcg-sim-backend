import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardTypeEntity} from "./entities/card-type.entity";
import {CardTypeRepository} from "./card-type.repository";
import {CardTypesService} from "./card-types.service";
import {CardTypesResolver} from "./card-types.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([CardTypeEntity, CardTypeRepository])
    ],
    providers: [
        CardTypesService,
        CardTypesResolver
    ]
})
export class CardTypesModule {

}
