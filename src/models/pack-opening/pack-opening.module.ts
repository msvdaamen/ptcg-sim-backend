import {Module} from "@nestjs/common";
import {PackOpeningService} from "./pack-opening.service";
import {PackOpeningResolver} from "./pack-opening.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardRepository} from "../cards/card.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CardRepository])
    ],
    providers: [
        PackOpeningService,
        PackOpeningResolver
    ]
})
export class PackOpeningModule {

}
