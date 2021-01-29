
export class QuickSellCommand {

    constructor(
        public readonly userId: number,
        public readonly cardId: number,
        public readonly amount: number
    ) {
    }
}
