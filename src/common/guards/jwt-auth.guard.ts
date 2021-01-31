import {ExecutionContext, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    getRequest(context: ExecutionContext) {
        // const ctx = GqlExecutionContext.create(context);
        // return ctx.getContext().req;

        const ctx = GqlExecutionContext.create(context);
        const { req, connection } = ctx.getContext();

        if ((connection && connection.context && connection.context.headers)) {
            return connection.context;
        }
        return req;
    }
}
