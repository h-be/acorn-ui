import _ from 'lodash'

import { fetchGoalHistory } from './actions'

const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case fetchGoalHistory.success().type:
      return {
        ...state,
        [payload.address]: {
          entries: payload.entries,
          members: payload.members,
          address: payload.address,
        },
      }
    default:
      return state
  }
}
