import {Module} from "@nestjs/common";
import {PackOpeningService} from "./pack-opening.service";
import {PackOpeningResolver} from "./pack-opening.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardRepository} from "../cards/card.repository";
import {RarityRepository} from "../rarities/rarity.repository";
import {UserHasCardRepository} from "../users/user-has-card.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CardRepository, RarityRepository, UserHasCardRepository])
    ],
    providers: [
        PackOpeningService,
        PackOpeningResolver
    ]
})
export class PackOpeningModule {

}
