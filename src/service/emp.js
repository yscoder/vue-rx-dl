import EmpApi from '../api/emp'
import { CacheService } from './base'
import _ from 'lodash'

const EmpService = new CacheService(EmpApi.all(), 'emp')

export const getEmps = () => EmpService.getModel()
export const addEmp = emp => EmpApi.add(emp).then(msg => {
    emp.id = msg.id
    EmpService.updateModel(cache => cache.push(emp))
    return emp
})
export const updateEmp = (emp) => EmpApi.update(emp.id, _.omit(emp, ['id'])).then(msg => {
    EmpService.updateModel(cache => {
        Object.assign(cache.find(item => item.id === msg.id), emp)
    })
    return msg
})
export const deleteEmp = idArr => EmpApi.deleteMultiple(idArr).then(msg => {
    EmpService.updateModel(cache => {
        idArr.forEach(id => cache.splice(_.findIndex(cache, item => item.id === id), 1))
    })
    return msg
})
export const updateEmpDept = (idArr, deptId) => {
    EmpService.updateModel(cache => cache.forEach(emp => {
        if(_.includes(idArr, emp.id)) {
            emp.deptId = deptId
        }
    }))
}
