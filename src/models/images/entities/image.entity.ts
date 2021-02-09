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

    // @Field()
    @Column()
    url: string;

    @Column({name: 'has_downloaded'})
    hasDownloaded: boolean;

    @OneToMany(() => CardEntity, card => card.smallImage)
    card: CardEntity[];

    @OneToMany(() => CardEntity, card => card.largeImage)
    largeCard: CardEntity[];
}
