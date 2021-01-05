import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RarityEntity} from "./entities/rarity.entity";
import {RarityRepository} from "./rarity.repository";
import {RaritiesService} from "./rarities.service";
import {RaritiesResolver} from "./rarities.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([RarityEntity, RarityRepository])
    ],
    providers: [
        RaritiesService,
        RaritiesResolver
    ]
})
export class RaritiesModule {

}
