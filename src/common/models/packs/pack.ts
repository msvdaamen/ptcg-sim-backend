enum PackTypes {
    COMMON = 'common',
    UNCOMMON = 'uncommon',
    HOLO = 'reverseHolo',
    RARES = 'rares'
}

export type PackType = keyof typeof PackTypes;

type Types = {
    [type in keyof typeof PackTypes]: number[];
};

export abstract class Pack {

    types: Types = {
        COMMON: [1],
        UNCOMMON: [2],
        HOLO: [4, 5, 8, 11, 20, 21],
        RARES: [3, 6, 7, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 22]
    };

    abstract get packRate(): { [type in keyof typeof PackTypes]: number};

    public getIds(type: keyof typeof PackTypes) {
        return this.types[type];
    }
}
