import { Model } from '../core'

const empDao = Model('emp')

export const getEmps = () => empDao.list()
