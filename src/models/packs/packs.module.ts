import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {PackEntity} from "./entities/pack.entity";
import {PackRepository} from "./pack.repository";
import {PacksService} from "./packs.service";
import {PacksResolver} from "./packs.resolver";
import {FindPacksQueryHandler} from "./queries/find-all/find-packs.query-handler";

const queryHandlers = [
    FindPacksQueryHandler
]

@Module({
    imports: [
        TypeOrmModule.forFeature([PackEntity, PackRepository]),
        CqrsModule
    ],
    providers: [
        ...queryHandlers,
        PacksService,
        PacksResolver
    ]
})
export class PacksModule {}
