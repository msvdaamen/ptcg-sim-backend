import {Field, ObjectType} from "@nestjs/graphql";
import {CardEntity} from "../../../models/cards/entities/card.entity";
import {PaginationModel} from "./pagination.model";

@ObjectType()
export class CardPaginationModel {

    @Field(() => [CardEntity])
    cards: CardEntity[];

    @Field(() => PaginationModel)
    pagination: PaginationModel;

}
