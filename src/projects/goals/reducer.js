/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import { FETCH_GOALS, ARCHIVE_GOAL, CREATE_GOAL, UPDATE_GOAL } from './actions'
import { typeSuccess, instanceIdFromActionType } from '../action_type_checker'

const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action

  const instanceId = instanceIdFromActionType(type)

  // CREATE_GOAL
  if (typeSuccess(type, CREATE_GOAL)) {
    return {
      ...state,
      [instanceId]: {
        ...state[instanceId],
        [payload.goal.address]: {
          ...payload.goal.entry,
          address: payload.goal.address,
        },
      },
    }
  }
  // UPDATE_GOAL
  else if (typeSuccess(type, UPDATE_GOAL)) {
    return {
      ...state,
      [instanceId]: {
        ...state[instanceId],
        [payload.address]: {
          ...payload.entry,
          address: payload.address,
        },
      },
    }
  }
  // FETCH_GOALS
  else if (typeSuccess(type, FETCH_GOALS)) {
    // payload is [ { goal: { key: val }, address: 'asdfy' }, ... ]
    const mapped = payload.map(r => {
      return {
        ...r.entry,
        address: r.address,
      }
    })
    // mapped is [ { key: val, address: 'asdfy' }, ...]
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
  // ARCHIVE_GOAL
  else if (typeSuccess(type, ARCHIVE_GOAL)) {
    // return the state without any goals whose address matches
    // the one we're archiving
    return {
      ...state,
      [instanceId]: _.pickBy(
        state[instanceId],
        (value, key) => key !== payload.address
      ),
    }
  }
  // DEFAULT
  else {
    return state
  }
}
