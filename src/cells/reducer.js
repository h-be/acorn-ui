import _ from 'lodash'

import { SET_PROFILES_CELL_ID, SET_PROJECTS_CELL_IDS } from './actions'

const defaultState = {
  profiles: null,
  projects: [],
}

export default function (state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case SET_PROFILES_CELL_ID:
      return {
        ...state,
        profiles: payload,
      }
    case SET_PROJECTS_CELL_IDS:
      return {
        ...state,
        projects: payload,
      }
    default:
      return state
  }
}
