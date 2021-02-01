import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import {CreateOrderCommand} from "./create-order.command";
import {HttpException, HttpStatus} from "@nestjs/common";
import {CardRepository} from "../../../../cards/card.repository";
import {UserHasCardRepository} from "../../../../users/user-has-card.repository";
import {OrderRepository} from "../../order.repository";
import {OrderCreatedEvent} from "../../events/order-created.event";
import { format, addHours } from 'date-fns'

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand> {

    constructor(
        private readonly cardRepository: CardRepository,
        private readonly userHasCardRepository: UserHasCardRepository,
        private readonly orderRepository: OrderRepository,
        private readonly eventBus: EventBus
    ) {
    }

    async execute({userId, cardId, price}: CreateOrderCommand): Promise<any> {
        const userHasCard = await this.userHasCardRepository.findOne({
            userId,
            cardId
        });
        if (!userHasCard) {
            throw new HttpException(`You don't have that card`,  HttpStatus.UNPROCESSABLE_ENTITY);
        }

        await this.userHasCardRepository.delete(userHasCard.id);

        const expireDate = format(addHours(new Date(), 4), 'yyyy-MM-dd');
        const createOrder = this.orderRepository.create({
            userId,
            cardId,
            price,
            expireDate
        });
        const [
            order,
            card
        ] = await Promise.all([
            this.orderRepository.save(createOrder),
            this.cardRepository.findOne({id: cardId})
        ]);
        this.eventBus.publish(
            new OrderCreatedEvent(order)
        );
        return card;
    }
}
