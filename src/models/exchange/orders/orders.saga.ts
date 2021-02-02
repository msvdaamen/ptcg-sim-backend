import {Injectable} from "@nestjs/common";
import {ICommand, ofType, Saga} from "@nestjs/cqrs";
import {Observable} from "rxjs";
import {OrderSoldEvent} from "./events/order-sold/order-sold.event";
import {map} from "rxjs/operators";
import {CreateOrderSuccessCommand} from "../orders-success/commands/create-order-succes/create-order-success.command";

@Injectable()
export class OrdersSaga {

    @Saga()
    orderSold = ($event: Observable<any>): Observable<ICommand> => {
        return $event.pipe(
            ofType(OrderSoldEvent),
            map(event => new CreateOrderSuccessCommand(event.order.userId, event.order.cardId, event.order.price))
        );
    }
}
