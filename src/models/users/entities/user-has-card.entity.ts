import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('user_has_card')
export class UserHasCardEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @Column({name: 'card_id'})
    cardId: number;
}
