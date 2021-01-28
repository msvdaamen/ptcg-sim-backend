import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity('orders_success')
export class OrderSuccessEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column({name: 'user_id'})
    userId: number;

    @Field(() => Int)
    @Column({name: 'card_id'})
    cardId: number;

    @Field(() => Int)
    @Column()
    price: number;

    @Field(() => Date)
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}
