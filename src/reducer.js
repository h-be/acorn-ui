/*
This file is the top level reducer.
Import all the reducers from each feature here

"reducers" are the things that contain key application logic
of how ACTIONS affect STATE
*/

import { combineReducers } from 'redux'

import agents from './agents/reducer'
import goals from './goals/reducer'
import edges from './edges/reducer'
import goalMembers from './goal-members/reducer'
import whoami from './who-am-i/reducer'
import agentAddress from './agent-address/reducer'
import projects from './projects/reducer'
import goalForm from './goal-form/reducer'
import selection from './selection/reducer'
import hover from './hover/reducer'
import keyboard from './keyboard/reducer'
import mouse from './mouse/reducer'
import screensize from './screensize/reducer'
import viewport from './viewport/reducer'
import expandedView from './expanded-view/reducer'
import goalVotes from './goal-votes/reducer'
import goalComments from './goal-comments/reducer'
import goalClone from './goal-clone/reducer'
import goalHistory from './goal-history/reducer'

// import anotherone from './another/path'

// combine reducers from each feature to create the top-level reducer
export default combineReducers({
  agents,
  projects,
  goals, // goals: goals,
  edges, // edges: edges,
  goalMembers,
  goalVotes,
  goalComments,
  whoami,
  agentAddress,
  ui: combineReducers({
    goalForm,
    selection,
    hover,
    keyboard,
    screensize,
    viewport,
    mouse,
    expandedView,
    goalClone,
    goalHistory,
  }), // ,
  // anotherone: anotherone
})
