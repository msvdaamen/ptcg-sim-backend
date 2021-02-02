import {Column, Entity, PrimaryColumn} from "typeorm";
import {Field, ID, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('user_stats')
export class UserStatsEntity {

    @Field(() => ID)
    @PrimaryColumn({name: 'user_id'})
    userId: number;

    @Field(() => Int)
    @Column({name: 'packs_opened'})
    packsOpened: number;
}
