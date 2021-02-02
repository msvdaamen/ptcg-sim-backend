import {Int, Parent, ResolveField, Resolver, Subscription} from "@nestjs/graphql";
import {UserEntity} from "./entities/user.entity";
import {Inject, UseGuards} from "@nestjs/common";
import {PubSub} from "graphql-subscriptions";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {subscriptionUserCheck} from "../../common/graphql/functions/subscriptiion-user-check";
import {UserStatsEntity} from "./entities/user-stats.entity";
import {UserDataLoader} from "./user.data-loader";

@UseGuards(JwtAuthGuard)
@Resolver(UserEntity)
export class UserResolver {

    constructor(
        @Inject('PUB_SUB')
        private readonly pubSub: PubSub,
        private readonly userDataLoader: UserDataLoader
    ) { }

    @ResolveField(() => UserStatsEntity)
    stats(
        @Parent() user: UserEntity
    ) {
        return this.userDataLoader.userStats.load(user.id);
    }

    @Subscription(() => Int, {
        filter: (payload, variables, context) => subscriptionUserCheck(context, payload.userId),
        resolve: payload => payload.balance
    })
    balanceChanged() {
        return this.pubSub.asyncIterator('balanceChanged');
    }
}
