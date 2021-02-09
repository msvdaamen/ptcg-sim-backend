import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, Float, Int, ObjectType} from "@nestjs/graphql";
import {CardEntity} from "../../../cards/entities/card.entity";

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

    @Field(() => Float)
    @Column()
    price: number;

    @Field(() => Date)
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @ManyToOne(() => CardEntity, card => card.orderSuccess)
    @JoinColumn({name: 'card_id'})
    card: CardEntity;
}
