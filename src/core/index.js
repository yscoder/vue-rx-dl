import DAO from './dao'

let pool = {}

export const Model = name => {
    if(!pool[name]) {
        pool[name] = new DAO(name)
    }
    return pool[name]
}
