import {Int, Resolver, Subscription} from "@nestjs/graphql";
import {UserEntity} from "./entities/user.entity";
import {Inject, UseGuards} from "@nestjs/common";
import {PubSub} from "graphql-subscriptions";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {CurrentUser} from "../../common/decorators/current-user";

@UseGuards(JwtAuthGuard)
@Resolver(UserEntity)
export class UserResolver {

    constructor(
        @Inject('PUB_SUB')
        private readonly pubSub: PubSub
    ) { }

    @Subscription(() => Int, {
        filter: (payload, variables, context) => {
            return context.connection.context.currentUser.id === payload.userId;
        },
        resolve: payload => payload.balance
    })
    balanceChanged() {
        return this.pubSub.asyncIterator('balanceChanged');
    }

}
