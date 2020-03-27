import _ from 'lodash'

import { HISTORY_OF_GOAL } from './actions'
import { typeSuccess, instanceIdFromActionType } from '../action_type_checker'

const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action

  const instanceId = instanceIdFromActionType(type)

  // HISTORY_OF_GOAL
  if (typeSuccess(type, HISTORY_OF_GOAL)) {
    return {
      ...state,
      [instanceId]: {
        ...state[instanceId],
        [payload.address]: payload,
      },
    }
  }
  // DEFAULT
  else {
    return state
  }
}
