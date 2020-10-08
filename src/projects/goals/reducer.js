
import _ from 'lodash'

import { createGoal, createGoalWithEdge, fetchGoals, updateGoal, archiveGoal } from './actions'
import { isCrud, crudReducer } from '../../crudRedux'

const defaultState = {}

export default function (state = defaultState, action) {
  if (
    isCrud(
      action,
      createGoal,
      fetchGoals,
      updateGoal,
      archiveGoal
    )
  ) {
    return crudReducer(
      state,
      action,
      createGoal,
      fetchGoals,
      updateGoal,
      archiveGoal
    )
  }

  const { payload, type } = action
  switch (type) {
    case createGoalWithEdge.success().type:
      const { meta: { cellIdString } } = action
      return {
        ...state,
        [cellIdString]: {
          ...state[cellIdString],
          [payload.goal.address]: {
            ...payload.goal.entry,
            address: payload.goal.address,
          },
        },
      }
    default:
      return state
  }
}
