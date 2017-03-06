export default class EventBus {
    constructor() {
        this.events = {}
    }

    on(type, callback, scope) {
        if(!(type in this.events)) {
            this.events[type] = []
        }

        this.events[type].push({
            callback,
            scope
        })
    }

    off(type, callback, scope) {
        if(!(type in this.events)) {
            return
        }

        if(!callback) {
            this.events[type] = []
            delete this.events[type]
        }

        this.events[type] = this.events[type].filter(e => {
            return e.callback !== callback && e.scope !== scope
        })
    }

    emit(type, ...args) {
        if(!(type in this.events)) {
            return
        }

        this.events[type].forEach(e => e.callback.apply(e.scope, args))
    }

    destroyEvents() {
        this.events = null
    }
}
