
export class DataLoaderHelper {

    static createMapArray<K = number, V = unknown>(defaultValue: any = []): DataLoaderArrayMap<K, V> {
        return new DataLoaderArrayMap<K, V>(defaultValue);
    }

    static createMap<K = number, V = unknown>(defaultValue: any = undefined): DataLoaderMap<K, V> {
        return new DataLoaderMap<K, V>(defaultValue);
    }

}

export class DataLoaderArrayMap<K = number, V = unknown> {
    map = new Map<K, V[]>();

    constructor(private defaultValue: any) { }

    add(key: K, value: V): void {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key).push(value);
    }

    get(key: K): V[] {
        return this.map.has(key) ? this.map.get(key) : this.defaultValue;
    }

    getAll(keys: K[]): V[][] {
        return keys.map(key => this.get(key));
    }
}

export class DataLoaderMap<K = number, V = unknown> {
    map = new Map<K, V>();

    constructor(private defaultValue: any) { }

    add(key: K, value: V): void {
        this.map.set(key, value);
    }

    get(key: K): V {
        return this.map.has(key) ? this.map.get(key) : this.defaultValue;
    }

    getAll(keys: K[]): V[] {
        return keys.map(key => this.get(key));
    }
}
