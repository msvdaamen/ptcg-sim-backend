import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardTypeEntity} from "./entities/card-type.entity";
import {CardTypeRepository} from "./card-type.repository";
import {CardTypesService} from "./card-types.service";
import {CardTypesResolver} from "./card-types.resolver";
import {CqrsModule} from "@nestjs/cqrs";
import {FindCardTypesQueryHandler} from "./queries/find-all/find-card-types.query-handler";

const queryHandlers = [FindCardTypesQueryHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([CardTypeEntity, CardTypeRepository]),
        CqrsModule
    ],
    providers: [
        ...queryHandlers,
        CardTypesService,
        CardTypesResolver
    ]
})
export class CardTypesModule {

}
