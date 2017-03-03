/**
 * 基于内存的数据缓存
 *
 * @class Storage
 */
export default class Storage {
    constructor() {
        this.store = new Map()
    }

    get length() {
        return this.store.size
    }

    save(k, v) {
        this.store.set(k, v)
    }

    get(k) {
        return this.store.get(k)
    }

    remove(k) {
        this.store.delete(k)
    }

    clear() {
        this.store.clear()
    }

    static create() {
        return new Storage()
    }
}
