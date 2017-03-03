import EmpApi from '../api/emp'
import { CacheService } from './base'

const EmpService = new CacheService(EmpApi.all(), 'emp')

export const getEmps = () => EmpService.getModel()
