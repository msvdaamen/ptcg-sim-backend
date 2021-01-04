import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class PaginationModel {

    static create(total: number, amount: number, page: number, dataAmount: number): PaginationModel {
        return {
            totalPages: Math.ceil(total / amount),
            perPage: amount,
            currentPage: page,
            count: dataAmount,
            total: total
        };
    }

    @Field()
    total: number;

    @Field()
    count: number;

    @Field()
    perPage: number;

    @Field()
    currentPage: number;

    @Field()
    totalPages: number;

}
