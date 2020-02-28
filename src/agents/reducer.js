/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import { SET_AGENT, fetchAgents } from './actions'

const defaultState = []

export default function(state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case fetchAgents.success().type:
      return _.keyBy(payload, 'address')
    case SET_AGENT:
      return {
        ...state,
        [payload.address]: payload,
      }
    default:
      return state
  }
}
