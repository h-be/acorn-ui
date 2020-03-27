import _ from 'lodash'
import {
  CREATE_PROJECT_META,
  UPDATE_PROJECT_META,
  FETCH_PROJECT_META,
} from './actions'
import { typeSuccess, instanceIdFromActionType } from '../action_type_checker'

const defaultState = {}

export default function(state = defaultState, action) {
  const { payload, type } = action

  const instanceId = instanceIdFromActionType(type)

  // all three share the same result type signature
  // CREATE_PROJECT_META
  // UPDATE_PROJECT_META
  // FETCH_PROJECT_META
  if (
    typeSuccess(type, CREATE_PROJECT_META) ||
    typeSuccess(type, UPDATE_PROJECT_META) ||
    typeSuccess(type, FETCH_PROJECT_META)
  ) {
    return {
      ...state,
      [instanceId]: {
        ...payload.entry,
        address: payload.address,
      },
    }
  }
  // DEFAULT
  else {
    return state
  }
}
