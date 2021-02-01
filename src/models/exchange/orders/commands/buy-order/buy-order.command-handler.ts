import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import {BuyOrderCommand} from "./buy-order.command";
import {OrderRepository} from "../../order.repository";
import {UserRepository} from "../../../../users/user.repository";
import {HttpException, HttpStatus} from "@nestjs/common";
import {UserBoughtCardEvent} from "../../../../users/events/user-bought-card/user-bought-card.event";

@CommandHandler(BuyOrderCommand)
export class BuyOrderCommandHandler implements ICommandHandler<BuyOrderCommand> {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
        private readonly eventBus: EventBus
    ) {
    }

    async execute({userId, orderId}: BuyOrderCommand): Promise<any> {
        const [order, user] = await Promise.all([
            this.orderRepository.findOne(orderId),
            this.userRepository.findOne(userId)
        ]);
        if (!order || !user) {
            throw new HttpException('Order does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (user.balance < order.price) {
            throw new HttpException('Users balance is to low', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        this.eventBus.publish(
            new UserBoughtCardEvent(order.cardId, order.userId, userId)
        )
    }

}
