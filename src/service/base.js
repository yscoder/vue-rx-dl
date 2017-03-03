import Cache from '../cache'
import { Observable } from 'rxjs/Observable'
// import _ from 'lodash'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/dom/webSocket'
import 'rxjs/add/observable/of'

const Storage = Cache.create()

export class Service {
    obsPromise(promise) {
        return Observable.fromPromise(promise)
    }

    obsSocket(url) {
        return Observable.webSocket(url)
    }
}

export class CacheService extends Service {
    constructor(promise, key) {
        super()
        this.promise = promise
        this.key = 'CHCHE_' + key.toUpperCase()
    }

    getModel() {
        const model = Storage.get(this.key)
        if(model) {
            return Observable.of(model)
        } else {
            return this.obsPromise(this.promise.then(data => {
                Storage.save(this.key, data)
                return Storage.get(this.key)
            }))
        }
    }

    updateModel(next) {
        next(Storage.get(this.key))
    }

    clearModel() {
        Storage.delete(this.key)
    }
}

export class SocketService extends Service {
    constructor(url) {
        super()
        this.url = url
        this.obs = this.obsSocket(url)
    }

    watch(fn) {
        this.obs.subscribe(fn)
    }

    send(data) {
        this.obs.next(JSON.stringify(data))
    }
}
