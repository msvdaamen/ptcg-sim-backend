import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardEntity} from "./entities/card.entity";
import {CardRepository} from "./card.repository";
import {CardsService} from "./cards.service";
import {CardsResolver} from "./cards.resolver";
import {CardsDataLoader} from "./cards.data-loader";

@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity, CardRepository])
    ],
    providers: [
        CardsService,
        CardsResolver,
        CardsDataLoader
    ]
})
export class CardsModule {

}
