import { Observable } from 'rxjs/Observable'
// import _ from 'lodash'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/dom/webSocket'
import 'rxjs/add/observable/of'

export class Service {
    obsPromise(promise) {
        return Observable.fromPromise(promise)
    }

    obsSocket(url) {
        return Observable.webSocket(url)
    }
}

export class CacheService extends Service {
    constructor(key, store) {
        super()
        this.store = store
        this.key = 'CHCHE_' + key.toUpperCase()
    }

    getModel(promise) {
        const model = this.store.getItem(this.key)
        if(model) {
            return Observable.of(model)
        } else {
            return this.obsPromise(promise.then(data => {
                this.store.setItem(this.key, data)
                return this.store.getItem(this.key)
            }))
        }
    }

    updateModel(next) {
        next(this.store.getItem(this.key))
    }

    clearModel() {
        this.store.delete(this.key)
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
