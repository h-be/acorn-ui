/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import {
  ADD_MEMBER_OF_GOAL,
  FETCH_GOAL_MEMBERS,
  ARCHIVE_MEMBER_OF_GOAL,
} from './actions'
import { ARCHIVE_GOAL } from '../goals/actions'
import { typeSuccess, instanceIdFromActionType } from '../action_type_checker'

const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action

  const instanceId = instanceIdFromActionType(type)

  // ADD_MEMBER_OF_GOAL
  if (typeSuccess(type, ADD_MEMBER_OF_GOAL)) {
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
  // FETCH_GOAL_MEMBERS
  else if (typeSuccess(type, FETCH_GOAL_MEMBERS)) {
    // payload is [ { entry: { key: val }, address: 'QmAsdFg' }, ... ]
    const mapped = payload.map(r => {
      return {
        ...r.entry,
        address: r.address,
      }
    })
    // mapped is [ { key: val, address: 'QmAsdFg' }, ...]
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
  // ARCHIVE_MEMBER_OF_GOAL
  else if (typeSuccess(type, ARCHIVE_MEMBER_OF_GOAL)) {
    return {
      ...state,
      [instanceId]: _.pickBy(
        state[instanceId],
        (value, key) => key !== payload
      ),
    }
  }
  // ARCHIVE_GOAL
  else if (typeSuccess(type, ARCHIVE_GOAL)) {
    // filter out the Goalmembers whose addresses are listed as having been
    // archived on account of having archived the Goal it relates to
    return {
      ...state,
      [instanceId]: _.pickBy(
        state[instanceId],
        (value, key) => payload.archived_goal_members.indexOf(key) === -1
      ),
    }
  }
  // DEFAULT
  else {
    return state
  }
}
