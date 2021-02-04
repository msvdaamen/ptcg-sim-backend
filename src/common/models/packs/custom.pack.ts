import {Pack} from "./pack";

export class CustomPack extends Pack {

    constructor(
        private common: number,
        private uncommon: number,
        private holo: number,
        private rare: number
    ) {
        super();
    }

    get packRate(): any {
        return {
            COMMON: this.common,
            UNCOMMON: this.uncommon,
            HOLO: this.holo,
            RARES: this.rare
        }
    }
}
