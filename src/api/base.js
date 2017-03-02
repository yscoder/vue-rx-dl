import axios from 'axios'

const Ajax = axios.create({
    // 公共 HTTP 配置
    // baseURL: 'https://some-domain.com/api/',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
    responseType: 'json'
})

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
    constructor(url) {
        this.url = this.fixUrl(url)
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
        return this.httpWrap(Ajax.get(url, params ? {
            params
        } : params))
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
