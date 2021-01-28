import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RarityEntity} from "./entities/rarity.entity";
import {RarityRepository} from "./rarity.repository";
import {RaritiesService} from "./rarities.service";
import {RaritiesResolver} from "./rarities.resolver";
import {RarityDataLoader} from "./rarity.data-loader";

@Module({
    imports: [
        TypeOrmModule.forFeature([RarityEntity, RarityRepository])
    ],
    providers: [
        RaritiesService,
        RaritiesResolver,
        RarityDataLoader
    ]
})
export class RaritiesModule {

}
