import {Parent, ResolveField, Resolver} from "@nestjs/graphql";
import {ImageEntity} from "./entities/image.entity";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Resolver(ImageEntity)
export class ImagesResolver {

    @ResolveField(() => String)
    url(@Parent() parent: ImageEntity) {
        return process.env.IMAGE_URL + '/' + parent.filename;
    }
}
