import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class CreateOrderInput {

    @Field(() => Int)
    cardId: number;

    @Field(() => Int)
    price: number;
}
