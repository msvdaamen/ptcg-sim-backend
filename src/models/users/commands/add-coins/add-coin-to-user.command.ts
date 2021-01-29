
export class AddCoinToUserCommand {
    constructor(
        public readonly userId: number,
        public readonly coins: number
    ) {
    }
}
