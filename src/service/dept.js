import DeptApi from '../api/dept'
import { CacheService } from './base'

const DeptService = new CacheService(DeptApi.all(), 'dept')

export const getDepts = () => DeptService.getModel()
