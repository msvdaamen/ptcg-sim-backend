import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('card_types')
export class CardTypeEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;
}
