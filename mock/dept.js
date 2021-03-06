const Mock = require('mockjs')

let data = [{
    uid: 22222,
    name: '测试'
}, {
    uid: 33333,
    name: '研发'
}, {
    uid: 44444,
    name: '前端',
    pid: 33333
}, {
    uid: 55555,
    name: '后端',
    pid: 33333
}]

module.exports = [
    {
        url: '/',
        data: data
    }, {
        url: '/',
        method: 'post',
        data: req => {
            const uid = Mock.mock('@id')
            data.push({
                uid,
                name: req.body.name,
                pid: parseInt(req.body.pid)
            })
            return { uid }
        }
    }
]
