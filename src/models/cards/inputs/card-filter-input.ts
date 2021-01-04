import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class CardFilterInput {

    @Field(() => String, {nullable: true})
    name: string;

    @Field(() => Int, {nullable: true})
    rarity: number;
}
