import Store from './store'
// import _ from 'lodash'

const beforeRequest = [
    // {
    //     url: '/aaa',
    //     method: 'get',
    //     handle: config => {

    //     }
    // }
]

const afterResponse = [{
    url: '/user',
    method: 'post',  // default: get
    handle: res => {
        Store.setUser(cache => {
            // 修改缓存
        })
    }
}]

export default {
    beforeRequest,
    afterResponse
}
