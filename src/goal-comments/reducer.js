import _ from 'lodash'

import {
  addCommentOfGoal,
  fetchGoalComments,
  archiveCommentOfGoal,
  updateGoalComment,
} from './actions'
import { archiveGoal } from '../goals/actions'

const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case addCommentOfGoal.success().type:
      return {
        ...state,
        [payload.address]: {
          ...payload.entry,
          address: payload.address,
        },
      }
    case updateGoalComment.success().type:
      return {
        ...state,
        [payload.address]: {
          ...payload.entry,
          address: payload.address,
        },
      }
    case fetchGoalComments.success().type:
      // payload is [ { entry: { key: val }, address: 'QmAsdFg' }, ... ]
      const mapped = payload.map(r => {
        return {
          ...r.entry,
          address: r.address,
        }
      })
      // mapped is [ { key: val, address: 'QmAsdFg' }, ...]
      return _.keyBy(mapped, 'address')
    case archiveCommentOfGoal.success().type:
      // the payload itself should be the address of the comment being archived
      // filter that comment out of the new state
      return _.pickBy(state, (value, key) => key !== payload)
    case archiveGoal.success().type:
      // filter out the Goalmembers whose addresses are listed as having been
      // archived on account of having archived the Goal it relates to
      return _.pickBy(
        state,
        (value, key) => payload.archived_goal_votes.indexOf(key) === -1
      )
    default:
      return state
  }
}
