import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {UserBalanceChangedEvent} from "./user-balance-changed.event";
import {Inject} from "@nestjs/common";
import {PubSub} from "graphql-subscriptions";

@EventsHandler(UserBalanceChangedEvent)
export class UserBalanceChangedEventHandler implements IEventHandler<UserBalanceChangedEvent> {

    constructor(
        @Inject('PUB_SUB') private readonly pubSub: PubSub
    ) {
    }

    handle({userId, balance}: UserBalanceChangedEvent): void {
        this.pubSub.publish('balanceChanged', {
            userId,
            balance
        });
    }



}
