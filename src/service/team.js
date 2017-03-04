import TeamApi from '../api/team'
import { CacheService } from './base'
import _ from 'lodash'

const TeamService = new CacheService(TeamApi.all(), 'team')

export const getTeam = () => TeamService.getModel()
export const updateTeam = (uid, team) => TeamApi.update(uid, _.omit(team, ['uid'])).then(msg => {
    if(msg.code === 1) {
        TeamService.updateModel(cache => {
            Object.assign(cache, team)
            console.log('[updateTeam]', cache)
            return cache
        })
    }
    return msg
})
