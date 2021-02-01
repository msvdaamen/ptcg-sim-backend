import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CancelOrderCommand} from "./cancel.-order.command";
import {OrderRepository} from "../../order.repository";
import {HttpException, HttpStatus} from "@nestjs/common";
import {getConnection} from "typeorm";
import {OrderEntity} from "../../entities/order.entity";
import {UserHasCardEntity} from "../../../../users/entities/user-has-card.entity";

@CommandHandler(CancelOrderCommand)
export class CancelOrderCommandHandler implements ICommandHandler<CancelOrderCommand> {

    constructor(
        private readonly orderRepository: OrderRepository,
    ) {
    }

    async execute({userId, orderId}: CancelOrderCommand): Promise<any> {
        const order = await this.orderRepository.findOne({
            id: orderId,
            userId
        });
        if (!order) {
            throw new HttpException('Order does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        await getConnection().transaction(async (manager) => {
            const userHasCard = manager.create(UserHasCardEntity, {
                cardId: order.cardId,
                userId
            });
            await Promise.all([
                manager.delete<OrderEntity>(OrderEntity,{
                    id: orderId,
                    userId
                }),
                manager.save(userHasCard)
            ]);
        })
    }
}
