/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/

import { SELECT_GOAL, UNSELECT_GOAL, UNSELECT_ALL } from './actions'
import { ARCHIVE_GOAL } from '../projects/goals/actions'
import { typeSuccess } from '../projects/action_type_checker'

const defaultState = {
  selectedGoals: [],
}

// removes an item from an array without mutating original array
function arrayWithoutElement(array, elem) {
  const newArray = array.slice()
  const index = newArray.indexOf(elem)
  if (index > -1) {
    newArray.splice(index, 1)
  }
  return newArray
}

export default function(state = defaultState, action) {
  const { payload, type } = action

  if (typeSuccess(type, ARCHIVE_GOAL)) {
    // unselect if the archived Goal was selected
    return state.selectedGoals.includes(payload.address)
      ? {
          ...state,
          selectedGoals: arrayWithoutElement(
            state.selectedGoals,
            payload.address
          ),
        }
      : { ...state }
  }

  switch (type) {
    case SELECT_GOAL:
      return {
        ...state,
        selectedGoals:
          state.selectedGoals.indexOf(payload) > -1
            ? state.selectedGoals.slice() // you should create a new copy of the array, regardless, because redux
            : state.selectedGoals.concat([payload]), // combine the existing list of selected with the new one to add
      }
    case UNSELECT_GOAL:
      return {
        ...state,
        selectedGoals: state.selectedGoals.filter(
          address => address !== payload
        ),
      }
    case UNSELECT_ALL:
      return {
        ...state,
        selectedGoals: [],
      }
    default:
      return state
  }
}
