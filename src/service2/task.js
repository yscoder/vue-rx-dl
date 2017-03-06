import { Model } from '../core'
import _ from 'lodash'
import 'rxjs/add/operator/combineLatest'

const empDao = Model('emp')
const taskDao = Model('task')

export const getTask = taskId => taskDao.one(taskId).combineLatest(empDao.list({
    enabled: true
}), (task, empList) => {
    task.members = empList.filter(emp => _.includes(task.members, emp.id))
    return task
})

export const getEmps = () => empDao.list()
