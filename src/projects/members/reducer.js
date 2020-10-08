/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import { SET_MEMBER, fetchMembers } from './actions'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action

  let cellId
  switch (type) {
    // FETCH_MEMBERS
    case fetchMembers.success().type:
      cellId = action.meta.cell_id
      return {
        ...state,
        [cellId]: _.keyBy(payload, 'address'),
      }
    // SET_MEMBER
    case SET_MEMBER:
      cellId = payload.cellId
      return {
        ...state,
        [cellId]: {
          ...state[cellId],
          [payload.member.address]: payload.member,
        },
      }
    // DEFAULT
    default:
      return state
  }
}
