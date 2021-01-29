import {PaginationInterface} from "../../../../common/interfaces/common/pagination.interface";
import {CardFilterInterface} from "../../../../common/interfaces/cards/card-filter.interface";

export class FindCardsPaginatedQuery {

    constructor(
        public readonly pagination: PaginationInterface,
        public readonly filter: CardFilterInterface
    ) {
    }
}
