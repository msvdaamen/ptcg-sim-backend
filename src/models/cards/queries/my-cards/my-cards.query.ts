import {PaginationInterface} from "../../../../common/interfaces/common/pagination.interface";
import {CardFilterInterface} from "../../../../common/interfaces/cards/card-filter.interface";

export class MyCardsQuery {

    constructor(
        public readonly userId: number,
        public readonly pagination: PaginationInterface,
        public readonly filter: CardFilterInterface
    ) {
    }
}
