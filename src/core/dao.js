import EventBus from './eventBus'
import Api from '../api/base'
import _ from 'lodash'

export default class DAO extends EventBus {
    constructor(name, { cached, key }) {
        super()
        this.data = new Map()
        this.name = name
        this.api = Api.create('/' + name)
        this.cached = cached
        this.key = key
    }

    get length() {
        return this.data.size
    }

    saveModel(data) {
        if(data instanceof Array) {
            data.forEach(item => this.saveModel(item))
        } else {
            this.updateModel(data)
        }
    }

    one(id) {
        if(!this.cached || this.data.has(id)) {
            return Promise.resolve(this.data.get(id))
        }
        return this.api.one(id).then(data => {
            this.saveModel(data)
            return this.one(id)
        })
    }
    // todo: save
    list(params) {
        if(!this.cached || this.length === 0) {
            return this.api.all(params).then(data => {
                this.saveModel(data)
                return this.list(params)
            })
        }
        if(!params) {
            return Promise.resolve([...this.data.values()])
        }
        // return Observable.of(this.data).map(data => _.filter([...data.values()], params))
        return this.list().then(data => {
            return _.filter(data, item => _.isEqual(params, _.pick(item, Object.keys(params))))
        })
    }

    updateModel(item) {
        let key = item[this.key]
        let data = this.data.get(key)
        if(!data) {
            this.data.set(key, item)
            return
        }
        this.data.set(key, Object.assign(data, item))
    }

    emitter(type, ...args) {
        this.emit(name + ':' + type, args)
    }

    insert(item) {
        return this.api.add(item).then(msg => {
            item.id = msg
            this.updateModel(item)
            this.emitter('insert', item)
            return item
        })
    }

    update(id, params) {
        return this.api.update(id, params).then(msg => {
            let item = Object.assign({}, params, {id})
            this.updateModel(item)
            this.emitter('update', item)
            return msg
        })
    }

    delete(id) {
        return this.api.delete(id).then(msg => {
            this.data.delete(id)
            this.emitter('delete', id)
            return msg
        })
    }

    destroy() {
        this.data.clear()
        this.destroyEvents()
    }
}
