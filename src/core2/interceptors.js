import Store from './store'
// import _ from 'lodash'

export const beforeRequest = [
    // {
    //     url: '/aaa',
    //     method: 'get',
    //     handle: config => {

    //     }
    // }
]

export const afterResponse = [{
    url: '/user',
    method: 'post',  // default: get
    handle: res => {
        Store.setUser(cache => {
            // 修改缓存
        })
    }
}]
