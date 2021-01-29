import {PaginationInterface} from "../../../../../common/interfaces/common/pagination.interface";

export class MyOrdersPaginatedQuery {

    constructor(
        public readonly userId: number,
        public readonly pagination: PaginationInterface
    ) {
    }
}
