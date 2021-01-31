

export class UserBalanceChangedEvent {

    constructor(
        public readonly userId: number,
        public readonly balance: number
    ) {
    }
}
