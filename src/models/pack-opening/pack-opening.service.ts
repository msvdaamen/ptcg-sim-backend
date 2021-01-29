import {Injectable} from "@nestjs/common";
import {NumberUtil} from "../../common/helpers/number.util";
import {CommandBus} from "@nestjs/cqrs";
import {OpenPackCommand} from "./commands/open-pack/open-pack.command";

@Injectable()
export class PackOpeningService {

    constructor(
        private readonly commandBus: CommandBus
    ) {
    }

    open(userId: number) {
        return this.commandBus.execute(
            new OpenPackCommand(userId)
        );
    }

    private changeCalculations(lootTable: any[], runs: number): {name: string, percentage: number, amount: number}[] {
        const picked: {[key: string]: number} = {};
        for (let i = 0; i < runs; i++) {
            const randomIndex = NumberUtil.randomBetween(0, lootTable.length - 1);
            const rarity = lootTable[randomIndex];
            if (!picked.hasOwnProperty(rarity)) {
                picked[rarity] = 0;
            }
            picked[rarity]++;
        }

        const percentageArray = [];
        for (const key in picked) {
            const amount = picked[key];
            const percentage = Math.floor(amount / runs * 100 * 100) / 100;
            percentageArray.push({name: key, percentage, amount: `${amount} / ${runs}`});
        }
        const sortedArray = percentageArray.sort((a, b) => {
            const keyA = new Date(a.percentage);
            const keyB = new Date(b.percentage);
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
        return sortedArray;
    }
}
