import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {CardEntity} from "../../cards/entities/card.entity";

@ObjectType()
@Entity('rarities')
export class RarityEntity {

    @Field(() => Int)
    @PrimaryColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Int)
    @Column()
    value: number;

    @OneToMany(() => CardEntity, card => card.rarity)
    cards: CardEntity[];
}
