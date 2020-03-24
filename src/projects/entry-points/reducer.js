/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import {
  CREATE_ENTRY_POINT,
  FETCH_ENTRY_POINTS,
  ARCHIVE_ENTRY_POINT,
} from './actions'
import { ARCHIVE_GOAL } from '../goals/actions'
import { typeSuccess, instanceIdFromActionType } from '../action_type_checker'

// state is at the highest level an object with instanceIds
// which are like Projects... EntryPoints exist within Projects
// so they are contained per project in the top level state

// state is an object where the keys are the entry addresses of "EntryPoints"
// and the values are modified versions of the EntryPoint data structures that
// also contain their address on those objects
const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action

  const instanceId = instanceIdFromActionType(type)

  // CREATE_ENTRY_POINT
  if (typeSuccess(type, CREATE_ENTRY_POINT)) {
    return {
      ...state,
      [instanceId]: {
        ...state[instanceId],
        [payload.entry_point_address]: {
          ...payload.entry_point,
          address: payload.entry_point_address,
        },
      },
    }
  }
  // FETCH_ENTRY_POINTS
  else if (typeSuccess(type, FETCH_ENTRY_POINTS)) {
    const mapped = payload.map(r => {
      return {
        ...r.entry_point,
        address: r.entry_point_address,
      }
    })
    const newVals = _.keyBy(mapped, 'address')
    // combines pre-existing values of the object with new values from
    // Holochain fetch
    return {
      ...state,
      [instanceId]: {
        ...state[instanceId],
        ...newVals,
      },
    }
  }
  // ARCHIVE_ENTRY_POINT
  else if (typeSuccess(type, ARCHIVE_ENTRY_POINT)) {
    return {
      ...state,
      [instanceId]: _.pickBy(
        state[instanceId],
        (value, key) => key !== payload
      ),
    }
  }
  // DEFAULT
  else {
    return state
  }
}
