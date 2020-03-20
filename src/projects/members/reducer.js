/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import { SET_MEMBER, FETCH_MEMBERS } from './actions'
import { typeSuccess, instanceIdFromActionType } from '../action_type_checker'

const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action

  const instanceId = instanceIdFromActionType(type)

  // FETCH_MEMBERS
  if (typeSuccess(type, FETCH_MEMBERS)) {
    return {
      ...state,
      [instanceId]: _.keyBy(payload, 'address'),
    }
  }
  // SET_MEMBER
  else if (type === SET_MEMBER) {
    return {
      ...state,
      [instanceId]: {
        ...state[instanceId],
        [payload.member.address]: payload.member,
      },
    }
  }
  // DEFAULT
  else {
    return state
  }
}
