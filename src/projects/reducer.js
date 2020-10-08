/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/
import { combineReducers } from 'redux'

import members from './members/reducer'
import goals from './goals/reducer'
import edges from './edges/reducer'
import entryPoints from './entry-points/reducer'
import goalComments from './goal-comments/reducer'
import goalMembers from './goal-members/reducer'
import goalVotes from './goal-votes/reducer'
import goalHistory from './goal-history/reducer'
import projectMeta from './project-meta/reducer'

export default combineReducers({
  projectMeta,
  members,
  goals,
  edges,
  entryPoints,
  goalMembers,
  goalVotes,
  goalComments,
  goalHistory,
})
