import DeptApi from '../api/dept'
import { CacheService } from './base'

const DeptService = new CacheService(DeptApi.all(), 'dept')

export const getDepts = () => DeptService.getModel()
export const addDept = dept => DeptApi.add(dept).then(msg => {
    dept.uid = msg.uid
    DeptService.updateModel(cache => {
        cache.push(dept)
        console.log('[addDept]', dept)
    })
    return dept
})
