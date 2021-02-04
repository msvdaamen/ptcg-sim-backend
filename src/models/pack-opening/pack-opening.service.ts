import {Injectable} from "@nestjs/common";
import {NumberUtil} from "../../common/helpers/number.util";
import {CommandBus} from "@nestjs/cqrs";
import {OpenPackCommand} from "./commands/open-pack/open-pack.command";

@Injectable()
export class PackOpeningService {

    constructor(
        private readonly commandBus: CommandBus
    ) {
    }

    open(userId: number, packId: number) {
        return this.commandBus.execute(
            new OpenPackCommand(userId, packId)
        );
    }
}
