import {Query, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RaritiesService} from "./rarities.service";
import {RarityEntity} from "./entities/rarity.entity";

@UseGuards(JwtAuthGuard)
@Resolver()
export class RaritiesResolver {

    constructor(
        private readonly raritiesService: RaritiesService
    ) {
    }

    @Query(() => [RarityEntity])
    rarities(): Promise<RarityEntity[]> {
        return this.raritiesService.all();
    }
}
