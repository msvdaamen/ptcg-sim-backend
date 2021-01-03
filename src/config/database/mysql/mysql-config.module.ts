import {Module} from "@nestjs/common";
import {MysqlConfigService} from "./mysql-config.service";

@Module({
    providers: [
        MysqlConfigService
    ],
    exports: [
        MysqlConfigService
    ]
})
export class MysqlConfigModule {

}
