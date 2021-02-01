export class UserBoughtCardEvent {

    constructor(
        public readonly cardId: number,
        public readonly userFromId: number,
        public readonly userToId: number
    ) {
    }
}
