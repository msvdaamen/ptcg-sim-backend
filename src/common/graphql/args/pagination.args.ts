import {Field, InputType} from "@nestjs/graphql";


@InputType()
export class PaginationArgs {
    @Field()
    page: number;

    @Field()
    amount: number;

}
