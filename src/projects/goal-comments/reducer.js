import _ from 'lodash'

import {
  createGoalComment,
  fetchGoalComments,
  updateGoalComment,
  archiveGoalComment,
} from './actions'
import { archiveGoal } from '../goals/actions'
import { isCrud, crudReducer } from '../../crudRedux'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action

  if (
    isCrud(
      action,
      createGoalComment,
      fetchGoalComments,
      updateGoalComment,
      archiveGoalComment
    )
  ) {
    return crudReducer(
      state,
      action,
      createGoalComment,
      fetchGoalComments,
      updateGoalComment,
      archiveGoalComment
    )
  }

  let cellId
  if (action.meta && action.meta.cell_id) {
    cellId = action.meta.cell_id
  }

  switch (type) {
    // ARCHIVE_GOAL
    case archiveGoal.success().type:
      // filter out the Goalmembers whose addresses are listed as having been
      // archived on account of having archived the Goal it relates to
      return {
        ...state,
        [cellId]: _.pickBy(
          state[cellId],
          (value, key) => payload.archived_goal_votes.indexOf(key) === -1
        ),
      }
    // DEFAULT
    default:
      return state
  }
}
