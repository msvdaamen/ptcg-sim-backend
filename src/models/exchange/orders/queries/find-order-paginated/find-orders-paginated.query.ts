import {PaginationInterface} from "../../../../../common/interfaces/common/pagination.interface";

export class FindOrdersPaginatedQuery {

    constructor(
        public readonly userId: number,
        public readonly pagination: PaginationInterface
    ) {
    }
}
