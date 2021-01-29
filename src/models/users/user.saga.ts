import {Injectable} from "@nestjs/common";
import {ICommand, ofType, Saga} from "@nestjs/cqrs";
import {Observable} from "rxjs";
import {UserSoldCardEvent} from "./events/user-sold-card/user-sold-card.event";
import {map} from "rxjs/operators";
import {AddCoinToUserCommand} from "./commands/add-coins/add-coin-to-user.command";

@Injectable()
export class UserSaga {

    @Saga()
    userSoldCards = ($event: Observable<any>): Observable<ICommand> => {
        return $event.pipe(
            ofType(UserSoldCardEvent),
            map(event => new AddCoinToUserCommand(event.userId, event.coins))
        );
    }

}
