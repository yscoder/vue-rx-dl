import _ from 'lodash'
import config from './config'
import { GET } from './ajax'

// 请求间隔时间
const REQUEST_WAIT = 300

let CACHE = {}
let PARAM_CACHE = new Map()

function handel(k, url) {
    let obj = {}

    // getXxx(params)
    obj.get = params => {
        let prevParams = PARAM_CACHE.get(k)
        // 增加执行间隔，避免短时间内重复请求
        const throttled = _.throttle(() => {
            const cacheData = CACHE[k]
            // 存在缓存且参数与原来一致时取缓存
            if(cacheData && _.isEqual(prevParams, params)) {
                throttled.cancel()
                return Promise.resolve(cacheData)
            }

            PARAM_CACHE.set(k, params)

            return GET(url, params).then(data => {
                CACHE[k] = data
                throttled.cancel()
                return data
            })
        }, REQUEST_WAIT)

        return throttled()
    }

    // setXxx(callback)
    // 在回调中对缓存进行修改操作，只修改数据，避免变更引用
    obj.set = next => next(CACHE[k])

    PARAM_CACHE.set(k, {})
    return obj
}

Object.keys(config).forEach(k => {
    config[k] = handel(k, config[k])
})

export default config
