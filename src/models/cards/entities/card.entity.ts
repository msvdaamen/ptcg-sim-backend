import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {ImageEntity} from "../../images/entities/image.entity";
import {RarityEntity} from "../../rarities/entities/rarity.entity";
import {OrderSuccessEntity} from "../../exchange/orders-success/entities/order-success.entity";
import {OrderEntity} from "../../exchange/orders/entities/order.entity";

@ObjectType()
@Entity('cards')
export class CardEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'custom_id'})
    customId: string;

    @Column({name: 'small_image_id', nullable: true})
    smallImageId: number;

    @Column({name: 'large_image_id', nullable: true})
    largeImageId: number;

    @Column({name: 'card_set_id'})
    cardSetId: number;

    @Column({name: 'artist_id', nullable: true})
    artistId: number;

    @Column({name: 'subtype_id', nullable: true})
    subtypeId: number;

    @Column({name: 'supertype_id'})
    supertypeId: number;

    @Column({name: 'ability_id', nullable: true})
    abilityId: number;

    @Field(() => Int)
    @Column({name: 'rarity_id'})
    rarityId: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    price: number;

    @Field({nullable: true})
    @Column({nullable: true})
    hp: string;

    @Field({nullable: true})
    @Column({nullable: true})
    number: string;

    @Field({nullable: true})
    @Column({name: 'national_pokedex_number', nullable: true})
    nationalPokedexNumber: number;

    @Field({nullable: true})
    @Column({nullable: true})
    description: string;

    // @Field()
    // @Column({name: 'ancient_trait', nullable: true})
    // ancientTrait: string;
    //

    @ManyToOne(() => RarityEntity, rarity => rarity.cards)
    @JoinColumn({name: 'rarity_id'})
    rarity: RarityEntity;

    @ManyToOne(() => ImageEntity, image => image.card)
    @JoinColumn({name: 'small_image_id'})
    smallImage: ImageEntity;

    @ManyToOne(() => ImageEntity, image => image.largeCard)
    @JoinColumn({name: 'large_image_id'})
    largeImage: ImageEntity;

    @OneToMany(() => OrderSuccessEntity, order => order.card)
    orderSuccess: OrderSuccessEntity[];

    @OneToMany(() => OrderEntity, order => order.card)
    order: OrderEntity[];
}
