import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RarityEntity} from "./entities/rarity.entity";
import {RarityRepository} from "./rarity.repository";
import {RaritiesService} from "./rarities.service";
import {RaritiesResolver} from "./rarities.resolver";
import {RarityDataLoader} from "./rarity.data-loader";
import {FindRaritiesQueryHandler} from "./query/find-all/find-rarities.query-handler";
import {CqrsModule} from "@nestjs/cqrs";

const queryHandlers = [FindRaritiesQueryHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([RarityEntity, RarityRepository]),
        CqrsModule
    ],
    providers: [
        ...queryHandlers,
        RaritiesService,
        RaritiesResolver,
        RarityDataLoader
    ]
})
export class RaritiesModule {

}
