import {Pack} from "./pack";
import {NumberUtil} from "../../helpers/number.util";

export class NormalPack extends Pack {

    commonAmount: number;
    uncommonAmount: number;

    constructor() {
        super();
        const commonAmount = NumberUtil.randomBetween(1, 8);
        this.commonAmount = commonAmount;
        this.uncommonAmount = 8 - commonAmount;
    }

    get packRate() {
        return {
            COMMON: this.commonAmount,
            UNCOMMON: this.uncommonAmount,
            HOLO: 1,
            RARES: 1
        }
    }
}
