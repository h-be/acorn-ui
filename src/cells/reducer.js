
import _ from 'lodash'

import { SET_PROFILES_CELL_ID } from './actions'

const defaultState = {
  profiles: null
}

export default function(state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case SET_PROFILES_CELL_ID:
      return {
        ...state,
        profiles: payload
      }
    default:
      return state
  }
}
