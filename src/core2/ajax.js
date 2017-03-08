import axios from 'axios'
import { beforeRequest, afterResponse } from './interceptors'

const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = FORM_CONTENT_TYPE
axios.defaults.headers.put['Content-Type'] = FORM_CONTENT_TYPE

const Ajax = axios.create({
    // 公共 HTTP 配置
    // baseURL: 'https://domain.com/api/',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
    responseType: 'json'
})

Ajax.interceptors.request.use(config => {
    const { url, method } = config
    beforeRequest.forEach(interceptor => {
        if(interceptor.method === method && interceptor.url === url) {
            interceptor.handle(config)
        }
    })
    return config
}, error => Promise.reject(error))

Ajax.interceptors.response.use(response => {
    const { url, method } = response.config

    afterResponse.forEach(interceptor => {
        if(interceptor.method === method && interceptor.url === url) {
            interceptor.handle(response)
        }
    })

    return response
}, error => Promise.reject(error))

const HTTP_WRAP = req => req.then(res => res.data).catch(err => console.error('[API]:', err))

export const GET = (url, params) => HTTP_WRAP(Ajax.get(url, { params }))
export const POST = (url, params) => HTTP_WRAP(Ajax.post(url, params))
export const PUT = (url, params) => HTTP_WRAP(Ajax.put(url, params))
export const DELETE = (url, params) => HTTP_WRAP(Ajax.delete(url, { params }))
export const REQUEST = config => HTTP_WRAP(Ajax.request(config))
