/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import _ from 'lodash'

import { createGoal, fetchGoals, updateGoal, archiveGoal } from './actions'
import { isCrud, crudReducer } from '../../crudRedux'

const defaultState = {}

export default function (state = defaultState, action) {
  if (
    isCrud(
      action,
      createGoal,
      fetchGoals,
      updateGoal,
      archiveGoal
    )
  ) {
    return crudReducer(
      state,
      action,
      createGoal,
      fetchGoals,
      updateGoal,
      archiveGoal
    )
  } else {
    return state
  }
}
