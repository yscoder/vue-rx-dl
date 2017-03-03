const Mock = require('mockjs')

let data = [
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 11111,
        enabled: false
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 11111,
        enabled: false
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 11111,
        enabled: true
    },
    {
        id: '@id',
        tel: /1[3578]\d{9}/,
        name: '@cname',
        deptId: 11111,
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
                name: req.param('name'),
                tel: req.param('tel'),
                deptId: parseInt(req.param('deptId')),
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

        }
    },
    {
        url: '/:id',
        method: 'delete',
        data: req => {

        }
    }
]
