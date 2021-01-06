import {Injectable} from "@nestjs/common";
import {CardRepository} from "../cards/card.repository";

@Injectable()
export class PackOpeningService {

    constructor(
        private readonly cardRepository: CardRepository
    ) {
    }

    open() {
        return this.cardRepository.createQueryBuilder('cards')
            .orderBy('RAND()')
            .limit(5)
            .getMany();
    }
}
