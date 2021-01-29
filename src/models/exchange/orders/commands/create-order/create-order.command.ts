
export class CreateOrderCommand {
    constructor(
        public readonly userId: number,
        public readonly cardId: number,
        public readonly price: number
    ) {
    }
}
