import _ from 'lodash'

import { fetchGoalHistory } from './actions'

const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case fetchGoalHistory.success().type:
      return {
        ...state,
        [payload.address]: payload,
      }
    default:
      return state
  }
}
