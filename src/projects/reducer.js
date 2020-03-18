/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import {
  createProject,
  fetchProjectsDnas,
  fetchProjectsInstances,
} from './actions'

const defaultState = {
  dnas: {},
  instances: {},
}

export default function(state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    case fetchProjectsDnas.success().type:
      // rename 'hash' to 'address'
      const mapped = payload.map(r => {
        return {
          id: r.id,
          address: r.hash, // for some reason its called 'hash' here instead of 'address'
        }
      })
      // mapped is [ { key: val, address: 'asdfy' }, ...]
      const newDnaVals = _.keyBy(mapped, 'id')
      // combines pre-existing values of the object with new values from
      // Holochain fetch
      return {
        ...state,
        dnas: {
          ...state.dnas,
          ...newDnaVals,
        },
      }
    case fetchProjectsInstances.success().type:
      const newInstanceVals = _.keyBy(payload, 'id')
      // combines pre-existing values of the object with new values from
      // Holochain fetch
      return {
        ...state,
        instances: {
          ...state.instances,
          ...newInstanceVals,
        },
      }
    default:
      return state
  }
}
