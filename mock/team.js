let data = {
    uid: '666666',
    name: '团队名称'
}

module.exports = [
    {
        url: '/',
        data: data
    },
    {
        url: '/:uid',
        method: 'put',
        data: req => {
            const uid = req.param('uid')
            if(uid === data.uid) {
                data.name = req.param('name')
                return {
                    code: 1
                }
            }
            return {
                code: 0,
                msg: '团队不存在！'
            }
        }
    }
]
