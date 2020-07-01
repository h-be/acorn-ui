/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import {
  PREVIEW_EDGES,
  CLEAR_EDGES_PREVIEW,
  CREATE_EDGE,
  UPDATE_EDGE,
  FETCH_EDGES,
  ARCHIVE_EDGE,
} from './actions'
import { CREATE_GOAL, ARCHIVE_GOAL } from '../goals/actions'
import { typeSuccess, instanceIdFromActionType } from '../action_type_checker'

const defaultState = {}

const PREVIEW_KEY_STRING = 'preview'

export default function (state = defaultState, action) {
  const { payload, type } = action

  let instanceId
  const simpleActionTypes = [PREVIEW_EDGES, CLEAR_EDGES_PREVIEW]
  if (simpleActionTypes.includes(type)) {
    instanceId = payload.instanceId
  } else {
    instanceId = instanceIdFromActionType(type)
  }

  // CREATE_EDGE
  if (type === PREVIEW_EDGES) {
    const previews = {}
    payload.edges.forEach(edge => {
      const rand = Math.random()
      previews[`${PREVIEW_KEY_STRING}${rand}`] = edge
    })
    return {
      ...state,
      [instanceId]: {
        ...state[instanceId],
        ...previews,
      },
    }
  } else if (type === CLEAR_EDGES_PREVIEW) {
    return {
      ...state,
      [instanceId]: _.pickBy(
        state[instanceId],
        (value, key) => !key.startsWith(PREVIEW_KEY_STRING)
      ),
    }
  } else if (typeSuccess(type, CREATE_EDGE)) {
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
  // UPDATE_EDGE
  else if (typeSuccess(type, UPDATE_EDGE)) {
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
  // FETCH_EDGES
  else if (typeSuccess(type, FETCH_EDGES)) {
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
  // ARCHIVE_EDGE
  else if (typeSuccess(type, ARCHIVE_EDGE)) {
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
    // filter out the Edges whose addresses are listed as having been
    // archived on account of having archived one of the Goals it links
    return {
      ...state,
      [instanceId]: _.pickBy(
        state[instanceId],
        (value, key) => payload.archived_edges.indexOf(key) === -1
      ),
    }
  }
  // CREATE_GOAL
  else if (typeSuccess(type, CREATE_GOAL)) {
    if (payload.maybe_edge) {
      return {
        ...state,
        [instanceId]: {
          ...state[instanceId],
          [payload.maybe_edge.address]: {
            ...payload.maybe_edge.entry,
            address: payload.maybe_edge.address,
          },
        },
      }
    } else {
      return state
    }
  }
  // DEFAULT
  else {
    return state
  }
}
