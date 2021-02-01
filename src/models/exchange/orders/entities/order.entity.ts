import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {UserEntity} from "../../../users/entities/user.entity";

@ObjectType()
@Entity('orders')
export class OrderEntity {

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

    @Column({name: 'expire_date'})
    expireDate: Date;

    @OneToMany(() => UserEntity, user => user.orders)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;
}
