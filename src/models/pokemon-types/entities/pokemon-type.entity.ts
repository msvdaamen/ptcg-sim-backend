import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('pokemon_types')
export class PokemonTypeEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;
}
