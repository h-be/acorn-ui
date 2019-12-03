/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import { fetchAgentAddress } from './actions'

const defaultState = ''

export default function(state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case fetchAgentAddress.success().type:
      return payload
    default:
      return state
  }
}
