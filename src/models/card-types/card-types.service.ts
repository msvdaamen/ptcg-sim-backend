import {Injectable} from "@nestjs/common";
import {CardTypeRepository} from "./card-type.repository";

@Injectable()
export class CardTypesService {

    constructor(
        private readonly cardTypeRepository: CardTypeRepository
    ) {
    }

    all() {
        return this.cardTypeRepository.find();
    }
}
