/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import { whoami, createWhoami, updateWhoami } from './actions'

const defaultState = null

export default function(state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case whoami.success().type:
    case createWhoami.success().type:
    case updateWhoami.success().type:
      return payload
    default:
      return state
  }
}

export function hasFetchedForWhoami(state = false, action) {
  const { type } = action
  switch (type) {
    case whoami.success().type:
      return true
    default:
      return state
  }
}
