
export class CreateOrderSuccessCommand {

    constructor(
        public readonly userId: number,
        public readonly cardId: number,
        public readonly price: number
    ) {
    }
}
