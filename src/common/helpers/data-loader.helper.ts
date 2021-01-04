
export class DataLoaderHelper {

    static createMapArray<K = number, V = unknown>(): DataLoaderArrayMap<K, V> {
        return new DataLoaderArrayMap<K, V>();
    }

    static createMap<K = number, V = unknown>(): DataLoaderMap<K, V> {
        return new DataLoaderMap<K, V>();
    }

}

export class DataLoaderArrayMap<K = number, V = unknown> {

    map = new Map<K, V[]>();

    add(key: K, value: V): void {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key).push(value);
    }

    get(key: K): V[] {
        return this.map.has(key) ? this.map.get(key) : [];
    }

    getAll(keys: K[]): V[][] {
        return keys.map(key => this.get(key));
    }
}

export class DataLoaderMap<K = number, V = unknown> {
    map = new Map<K, V>();

    add(key: K, value: V): void {
        this.map.set(key, value);
    }

    get(key: K): V {
        return this.map.get(key)
    }

    getAll(keys: K[]): V[] {
        return keys.map(key => this.get(key));
    }
}
