import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImageEntity} from "./entities/image.entity";
import {ImageRepository} from "./image.repository";
import {ImageController} from "./image.controller";
import {ImagesResolver} from "./images.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([ImageEntity, ImageRepository])
    ],
    controllers: [
        ImageController
    ],
    providers: [
        ImagesResolver
    ]
})
export class ImagesModule {

}
