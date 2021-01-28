import {Field, Int, ObjectType} from "@nestjs/graphql";
import {CardEntity} from "../entities/card.entity";

@ObjectType()
export class CardQuickSellModel {

    @Field(() => CardEntity)
    card: CardEntity;

    @Field(() => Int)
    value: number;
}
