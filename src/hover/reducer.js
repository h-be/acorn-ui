/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/

import { HOVER_EDGE, UNHOVER_EDGE, HOVER_GOAL, UNHOVER_GOAL } from './actions'
import { ARCHIVE_GOAL } from '../projects/goals/actions'
import { ARCHIVE_EDGE } from '../projects/edges/actions'
import { typeSuccess } from '../projects/action_type_checker'

const defaultState = {
  hoveredGoal: null,
  hoveredEdge: null,
}

export default function (state = defaultState, action) {
  const { payload, type } = action

  if (typeSuccess(type, ARCHIVE_GOAL)) {
    // unhover if the archived Goal was hovered over
    return state.hoveredGoal === payload.address
      ? {
          ...state,
          hoveredGoal: null,
        }
      : { ...state }
  } else if (typeSuccess(type, ARCHIVE_EDGE)) {
    // unhover if the archived edge was hovered over
    return state.hoveredEdge === payload.address
      ? {
          ...state,
          hoveredEdge: null,
        }
      : { ...state }
  }

  switch (type) {
    case HOVER_EDGE:
      return {
        ...state,
        hoveredEdge: payload,
      }
    case UNHOVER_EDGE:
      return {
        ...state,
        hoveredEdge: null,
      }
    case HOVER_GOAL:
      return {
        ...state,
        hoveredGoal: payload,
      }
    case UNHOVER_GOAL:
      return {
        ...state,
        hoveredGoal: null,
      }
    default:
      return state
  }
}
