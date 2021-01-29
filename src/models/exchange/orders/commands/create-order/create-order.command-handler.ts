import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateOrderCommand} from "./create-order.command";
import {HttpException, HttpStatus} from "@nestjs/common";
import {CardRepository} from "../../../../cards/card.repository";
import {UserHasCardRepository} from "../../../../users/user-has-card.repository";
import {OrderRepository} from "../../order.repository";

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand> {

    constructor(
        private readonly cardRepository: CardRepository,
        private readonly userHasCardRepository: UserHasCardRepository,
        private readonly orderRepository: OrderRepository
    ) {
    }

    async execute({userId, cardId, price}: CreateOrderCommand): Promise<any> {
        const {affected} = await this.userHasCardRepository
            .createQueryBuilder('userHasCard')
            .where('userHasCard.userId = :userId AND userHasCard.cardId = :cardId', {userId, cardId})
            .limit(1)
            .delete()
            .execute();
        if (!affected) {
            throw new HttpException(`You don't have that card`,  HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const now = new Date();
        const expireDate = new Date().setHours(now.getHours() + 4);
        const createOrder = this.orderRepository.create({
            userId,
            cardId,
            price,
            createdAt: now,
            expireDate
        });
        const [
            order,
            card
        ] = await Promise.all([
            this.orderRepository.save(createOrder),
            this.cardRepository.findOne({id:  cardId})
        ]);
        return card;
    }

}
