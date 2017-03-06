import EventBus from './eventBus'
import Api from '../api/base'
import { Observable } from 'rxjs/Observable'
import _ from 'lodash'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'

export default class DAO extends EventBus {
    constructor(name) {
        super()
        this.data = new Map()
        this.api = Api.create('/' + name)
        window[name + 'Data'] = this.data
    }

    get length() {
        return this.data.size
    }

    one(id) {
        if(this.data.has(id)) {
            return Observable.of(this.data.get(id))
        } else {
            return Observable.fromPromise(this.api.one(id))
        }
    }
    // todo: save
    list(params) {
        if(this.length === 0) {
            return Observable.fromPromise(this.api.all(params))
        }
        if(!params) {
            return Observable.of(this.data).map(data => [...data.values()])
        }
        return Observable.of(this.data).map(data => _.filter([...data.values()], params))
    }

    _updateModel(id, item) {
        let data = this.data.get(id)
        if(!data) {
            this.data.set(id, item)
            return
        }
        this.data.set(id, Object.assign({}, data, item))
    }

    _emitter(type, ...args) {
        this.emit(type, args)
    }

    insert(item) {
        return this.api.add(item).then(msg => {
            item.id = msg
            this._updateModel(item)
            this._emitter('insert', item)
            return item
        })
    }

    update(id, params) {
        return this.api.update(id, params).then(msg => {
            this._updateModel(id, params)
            this._emitter('update', Object.assign({}, params, {id}))
            return msg
        })
    }

    delete(id) {
        return this.api.delete(id).then(msg => {
            this.data.delete(id)
            this._emitter('delete', id)
            return msg
        })
    }

    destroy() {
        this.data.clear()
        this.destroyEvents()
    }
}
