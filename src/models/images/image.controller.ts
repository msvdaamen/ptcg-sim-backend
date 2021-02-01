import {Body, Controller, Get, HttpException, Param, Res} from "@nestjs/common";
import {ImageRepository} from "./image.repository";
import * as request from 'request';
import * as fs from 'fs';
import {Response} from "express";
import * as path from "path";

@Controller('images')
export class ImageController {

    constructor(
        private readonly imageRepository: ImageRepository
    ) {
    }

    @Get('cards/:name')
    async card(
        @Param('name') imageName: string,
        @Res() res: Response
    ) {
        const image = await this.imageRepository.findOne({
            filename: imageName
        });
        if (!image) {
            throw new HttpException('Image does not exist', 404);
        }
        if (!image.hasDownloaded) {
            await this.downloadImage(image.url, path.resolve('images', image.filename));
            image.hasDownloaded = true;
            await this.imageRepository.save(image);
        }
        return res.sendFile(path.resolve('images', image.filename));
    }

    downloadImage(uri: string, filename: string) {
        return new Promise((resolve, reject) => {
            request.head(uri, function(err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
            });
        })
    }
}
