import axios from 'axios'
import Cache from '../cache'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/dom/webSocket'
import 'rxjs/add/observable/of'

const Storage = Cache.create()

const Ajax = axios.create({
    // 公共 HTTP 配置
    // baseURL: 'https://some-domain.com/api/',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
    responseType: 'json'
})

const urlFormat = (url, params = {}) => {
    Object.keys(params).forEach((k, i) => {
        url = url + `${i === 0 ? '?' : '&'}${k}=${params[k]}`
    })
    return url
}

// Ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * 对常用 Rest 请求格式的封装
 * 以一个实体 User 为例，基础 URL 为 `/api/user`，则：
 * 查询 GET /api/user/:id
 * 添加 POST /api/user
 * 修改 PUT /api/user/:id
 * 删除 DELETE /api/user/:id
 *
 * @export
 * @class Api
 */
export default class Api {
    constructor(url, cached = false) {
        this.url = this.fixUrl(url)
        this.cached = cached
    }

    fixUrl(url) {
        return url.lastIndexOf('/') === url.length ? url : url + '/'
    }

    static create(url) {
        return new Api(url)
    }

    httpWrap(req) {
        return req.then(res => res.data).catch(err => console.error('[API]:', err))
    }

    add(m) {
        return this.httpWrap(Ajax.post(this.url, m))
    }

    query(url, params) {
        const request = this.httpWrap(Ajax.get(url, params ? {
            params
        } : params))

        if(!this.cached) {
            return request
        }

        const key = urlFormat(url, params)
        const model = Storage.get(key)
        if (model) {
            return Observable.of(model)
        } else {
            return request.then(data => {
                Storage.save(key, data)
                return Storage.get(key)
            })
        }
    }

    update(id, m) {
        return this.httpWrap(Ajax.put(this.url + id, m))
    }

    delete(id, params) {
        return this.httpWrap(Ajax.delete(this.url + id, params ? {
            params
        } : params))
    }

    request(config) {
        return this.httpWrap(Ajax.request(config))
    }

    one(id, params) {
        return this.query(this.url + id, params)
    }

    all(params) {
        return this.query(this.url, params)
    }
}
