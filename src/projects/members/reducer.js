
import _ from 'lodash'

import { SET_MEMBER, fetchMembers } from './actions'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action

  let cellId
  switch (type) {
    // FETCH_MEMBERS
    case fetchMembers.success().type:
      cellId = action.meta.cellIdString
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
