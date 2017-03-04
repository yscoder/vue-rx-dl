import Api from './base'

const EmpApi = Api.create('/emp')

EmpApi.deleteMultiple = idArr => EmpApi.request({
    method: 'delete',
    params: { idArr }
})

export default EmpApi
