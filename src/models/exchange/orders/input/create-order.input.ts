import {Field, Float, InputType, Int} from "@nestjs/graphql";

@InputType()
export class CreateOrderInput {

    @Field(() => Int)
    cardId: number;

    @Field(() => Float)
    price: number;
}
