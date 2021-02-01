import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {OrderEntity} from "../../exchange/orders/entities/order.entity";

@ObjectType()
@Entity({name: 'users'})
export class UserEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    email: string;

    @Column()
    password: string;

    @Field()
    @Column()
    balance: number;

    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[];
}
