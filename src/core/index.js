import DAO from './dao'

let pool = {}

export const Model = (name, option = { cached: true, key: 'id' }) => {
    if(!pool[name]) {
        pool[name] = new DAO(name, option)
    }
    return pool[name]
}
