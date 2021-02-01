
export class BuyOrderCommand {

    constructor(
        public readonly userId: number,
        public readonly orderId: number
    ) {
    }
}
