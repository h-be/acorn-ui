import _ from 'lodash'

import { fetchGoalHistory } from './actions'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action

  let cellId
  if (action.meta && action.meta.cell_id) {
    cellId = action.meta.cell_id
  }

  switch (type) {
    // HISTORY_OF_GOAL
    case fetchGoalHistory.success().type:
      return {
        ...state,
        [cellId]: {
          ...state[cellId],
          [payload.address]: payload,
        },
      }
    // DEFAULT
    default:
      return state
  }
}
