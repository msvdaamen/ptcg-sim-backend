
export class UserSoldCardEvent {

    constructor(
        public readonly userId: number,
        public readonly coins: number
    ) {
    }
}
