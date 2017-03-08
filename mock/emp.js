const Mock = require('mockjs')
const _ = require('lodash')

let data = [
    {
        id: 10000,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        enabled: false
    },
    {
        id: 10001,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        enabled: false
    },
    {
        id: 10002,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        enabled: true
    },
    {
        id: 10003,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        enabled: true
    },
    {
        id: 10004,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 22222,
        enabled: true
    },
    {
        id: 10005,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 22222,
        enabled: true
    },
    {
        id: 10006,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 33333,
        enabled: true
    },
    {
        id: 10007,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 44444,
        enabled: true
    },
    {
        id: 10008,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 55555,
        enabled: true
    },
    {
        id: 10009,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 55555,
        enabled: true
    },
    {
        id: 10010,
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 44444,
        enabled: true
    }
]

module.exports = [
    {
        url: '/',
        data: req => data
    },
    {
        url: '/',
        method: 'post',
        data: req => {
            const id = parseInt(Mock.mock('@id'))
            data.push({
                id,
                name: req.body.name,
                tel: req.body.tel,
                deptId: parseInt(req.body.deptId),
                enabled: true
            })
            return {
                id
            }
        }
    },
    {
        url: '/:id',
        method: 'put',
        data: req => {
            const id = parseInt(req.params.id)
            console.log(req.body)
            const newVal = _.mapValues(req.body, (v, k) => {
                let r = v
                if(k === 'deptId') {
                    r = parseInt(r)
                }
                if(k === 'enabled') {
                    r = r !== 'false'
                }
                return r
            })
            console.log(newVal)
            Object.assign(data.find(item => item.id === id), newVal)

            return { code: 1 }
        }
    },
    {
        url: '/:id',
        method: 'delete',
        data: req => {
            const id = parseInt(req.params.id)
            _.remove(data, item => item.id === id)
            return { code: 1 }
        }
    },
    {
        url: '/',
        method: 'delete',
        data: req => {
            const idArr = req.query.idArr
            _.remove(data, item => _.includes(idArr, item.id))
            return { code: 1 }
        }
    }
]
