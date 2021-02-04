import {Query, Resolver} from "@nestjs/graphql";
import {PackEntity} from "./entities/pack.entity";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {PacksService} from "./packs.service";

@UseGuards(JwtAuthGuard)
@Resolver(PackEntity)
export class PacksResolver {

    constructor(
        private readonly packsService: PacksService
    ) {
    }

    @Query(() => [PackEntity])
    packs() {
        return this.packsService.find();
    }
}
