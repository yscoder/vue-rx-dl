const Mock = require('mockjs')
const _ = require('lodash')

let data = [
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        enabled: false
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        enabled: false
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 22222,
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 22222,
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 33333,
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 44444,
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 55555,
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 55555,
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 44444,
        enabled: true
    }
]

module.exports = [
    {
        url: '/',
        data: data
    },
    {
        url: '/',
        method: 'post',
        data: req => {
            const id = Mock.mock('@id')
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
            const id = req.params.id
            console.log(req.body)
            const newVal = _.mapValues(req.body, (v, k) => {
                let r = v
                if(k === 'deptId') {
                    r = parseInt(r)
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
            const id = req.params.id
            _.remove(data, item => item.id === id)
            return { code: 1 }
        }
    },
    {
        url: '/',
        method: 'delete',
        data: req => {
            const idArr = req.params.idArr
            _.remove(data, item => _.includes(idArr, item.id))
            return { code: 1 }
        }
    }
]
