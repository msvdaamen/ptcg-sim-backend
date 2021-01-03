import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class MysqlConfigService {

    constructor(
        private readonly configService: ConfigService
    ) {
    }

    get username() {
        return this.configService.get<string>('DATABASE_USERNAME', 'root');
    }

    get password() {
        return this.configService.get<string>('DATABASE_PASSWORD', '');
    }

    get host() {
        return this.configService.get<string>('DATABASE_HOST', 'localhost');
    }

    get port() {
        return this.configService.get<number>('DATABASE_PORT', 3306);
    }

    get name() {
        return this.configService.get<string>('DATABASE_NAME', 'ptcg-sim');
    }

}
