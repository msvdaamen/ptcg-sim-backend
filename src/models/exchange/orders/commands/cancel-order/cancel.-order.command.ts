
export class CancelOrderCommand {

    constructor(
        public readonly userId: number,
        public readonly orderId: number
    ) {
    }
}
