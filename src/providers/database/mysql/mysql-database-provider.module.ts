import {Module} from "@nestjs/common";
import {MysqlConfigModule} from "../../../config/database/mysql/mysql-config.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MysqlConfigService} from "../../../config/database/mysql/mysql-config.service";

@Module({
    imports: [
        MysqlConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [
                MysqlConfigModule
            ],
            useFactory: (mysqlConfigService: MysqlConfigService) => ({
                type: 'mysql',
                host: mysqlConfigService.host,
                port: mysqlConfigService.port,
                username: mysqlConfigService.username,
                password: mysqlConfigService.password,
                database: mysqlConfigService.name,
                autoLoadEntities: true,
                synchronize: false
            }),
            inject: [MysqlConfigService]
        })

    ]
})
export class MysqlDatabaseProviderModule {

}
