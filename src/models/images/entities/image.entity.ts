import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {CardEntity} from "../../cards/entities/card.entity";


@ObjectType()
@Entity({name: 'images'})
export class ImageEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    filename: string;

    @Field()
    @Column()
    url: string;

    @OneToMany(() => CardEntity, card => card.image)
    card: CardEntity[];

    @OneToMany(() => CardEntity, card => card.image)
    hresCard: CardEntity[];
}
