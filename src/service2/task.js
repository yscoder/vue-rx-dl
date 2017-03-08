import { Model } from '../core'
import { Observable } from 'rxjs/Observable'
import _ from 'lodash'
import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'

const empDao = Model('emp')
const taskDao = Model('task')

const emps = Observable.fromPromise(empDao.list({
    enabled: true
}))

export const getTask = taskId => Observable.fromPromise(taskDao.one(taskId)).combineLatest(emps,
(task, empList) => {
    task.members = empList.filter(emp => _.includes(task.members, emp.id))
    return task
})

export const getEmps = () => emps
export const updateEmp = (id, param) => empDao.update(id, param)
