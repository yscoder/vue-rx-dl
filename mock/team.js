let data = {
    uid: 111111,
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
            const uid = parseInt(req.params.uid)
            if(uid === data.uid) {
                data.name = req.body.name
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
