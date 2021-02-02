import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import {BuyOrderCommand} from "./buy-order.command";
import {OrderRepository} from "../../order.repository";
import {UserRepository} from "../../../../users/user.repository";
import {HttpException, HttpStatus} from "@nestjs/common";
import {getConnection} from "typeorm";
import {UserBalanceChangedEvent} from "../../../../users/events/user-balance-changed/user-balance-changed.event";
import {UserHasCardEntity} from "../../../../users/entities/user-has-card.entity";
import {OrderEntity} from "../../entities/order.entity";
import {OrderSoldEvent} from "../../events/order-sold/order-sold.event";

@CommandHandler(BuyOrderCommand)
export class BuyOrderCommandHandler implements ICommandHandler<BuyOrderCommand> {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
        private readonly eventBus: EventBus
    ) {
    }

    async execute({userId, orderId}: BuyOrderCommand): Promise<any> {
        const [order, buyer] = await Promise.all([
            this.orderRepository.findOne(orderId, {relations: ['user']}),
            this.userRepository.findOne(userId)
        ]);
        const seller = order.user
        if (!order || !buyer) {
            throw new HttpException('Order does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (buyer.balance < order.price) {
            throw new HttpException('Users balance is to low', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        await getConnection().transaction(async manager => {
            seller.balance += order.price;
            buyer.balance -= order.price;
            const userHasCard = manager.create(UserHasCardEntity, {
                userId: buyer.id,
                cardId: order.cardId
            });
            await Promise.all([
                manager.save([buyer, seller, userHasCard]),
                manager.delete(OrderEntity, {id: order.id})
            ]);
        });
        this.eventBus.publishAll([
            new UserBalanceChangedEvent(seller.id, seller.balance),
            new UserBalanceChangedEvent(buyer.id, buyer.balance),
            new OrderSoldEvent(order, buyer.id, seller.id)
        ]);
    }

}
