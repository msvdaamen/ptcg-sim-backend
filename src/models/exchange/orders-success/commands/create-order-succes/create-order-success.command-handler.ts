import {CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import {CreateOrderSuccessCommand} from "./create-order-success.command";
import {OrderSuccessRepository} from "../../order-success.repository";
import {OrderSuccessCreatedEvent} from "../../events/order-success-created/order-success-created.event";
import {OrderSuccessEntity} from "../../entities/order-success.entity";

@CommandHandler(CreateOrderSuccessCommand)
export class CreateOrderSuccessCommandHandler implements ICommandHandler<CreateOrderSuccessCommand> {

    constructor(
        private readonly orderSuccessRepository: OrderSuccessRepository,
        private readonly eventBus: EventBus
    ) {
    }

    async execute({userId, cardId, price}: CreateOrderSuccessCommand): Promise<OrderSuccessEntity> {
        const orderSuccessCreate = this.orderSuccessRepository.create({
            userId,
            cardId,
            price
        });
        const orderSuccess = await this.orderSuccessRepository.save(orderSuccessCreate);
        this.eventBus.publish(
            new OrderSuccessCreatedEvent(orderSuccess)
        );
        return orderSuccess;
    }

}
