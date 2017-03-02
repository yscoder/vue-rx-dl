/**
 * 基于内存的数据存储，提供与 webStorage 一致的操作方法
 *
 * @class RAM
 */
class RAM {
    constructor() {
        this.storage = new Map()
    }

    get length() {
        return this.storage.size
    }

    setItem(k, v) {
        this.storage.set(k, v)
    }

    getItem(k) {
        return this.storage.get(k)
    }

    removeItem(k) {
        this.storage.delete(k)
    }

    clear() {
        this.storage.clear()
    }

    key(i) {
        return this.storage.keys()[i]
    }
}

RAM.Storage = new RAM()

class NativeStorage {
    constructor(storage) {
        this.storage = storage
    }

    get length() {
        return this.storage.length
    }

    setItem(k, v) {
        this.storage.set(k, JSON.stringify(v))
    }

    getItem(k) {
        return JSON.parse(this.storage.get(k))
    }

    removeItem(k) {
        this.storage.delete(k)
    }

    clear() {
        this.storage.clear()
    }

    key(i) {
        return this.storage.keys()[i]
    }
}

export default {
    RAM: RAM.Storage,
    SESSION: new NativeStorage(window.sessionStorage),
    LOCAL: new NativeStorage(window.localStorage)
}

// export const create = level => {
//     switch (level) {
//         case
//     }
// }
