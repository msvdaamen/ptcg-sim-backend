import {PaginationInterface} from "../../../../../common/interfaces/common/pagination.interface";

export class FindOrdersPaginatedQuery {

    constructor(
        public readonly pagination: PaginationInterface
    ) {
    }
}
