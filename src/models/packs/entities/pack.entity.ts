import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Float, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('packs')
export class PackEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String, {nullable: true})
    @Column()
    description: string;

    @Field(() => Float)
    @Column()
    price: number;

    @Column()
    common: number;

    @Column()
    uncommon: number;

    @Column()
    holo: number;

    @Column()
    rare: number;
}
