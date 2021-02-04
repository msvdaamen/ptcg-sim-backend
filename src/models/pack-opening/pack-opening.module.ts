import {Module} from "@nestjs/common";
import {PackOpeningService} from "./pack-opening.service";
import {PackOpeningResolver} from "./pack-opening.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardRepository} from "../cards/card.repository";
import {RarityRepository} from "../rarities/rarity.repository";
import {UserHasCardRepository} from "../users/user-has-card.repository";
import {CqrsModule} from "@nestjs/cqrs";
import {OpenPackCommandHandler} from "./commands/open-pack/open-pack.command-handler";
import {PackRepository} from "../packs/pack.repository";

const commandHandlers = [
    OpenPackCommandHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([CardRepository, RarityRepository, UserHasCardRepository, PackRepository]),
        CqrsModule
    ],
    providers: [
        ...commandHandlers,
        PackOpeningService,
        PackOpeningResolver
    ]
})
export class PackOpeningModule {

}
