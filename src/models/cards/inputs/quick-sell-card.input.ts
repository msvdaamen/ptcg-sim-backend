import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class QuickSellCardInput {

    @Field(() => Int)
    cardId: number;

    @Field(() => Int)
    amount: number;
}
