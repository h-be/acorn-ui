/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createHolochainZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROFILES_INSTANCE_NAME, PROFILES_ZOME_NAME } from '../holochainConfig'

// SET because it could be brand new, or an update, but treat it the same way
const SET_AGENT = 'set_agent'

/* action creator functions */

const setAgent = agent => {
  return {
    type: SET_AGENT,
    payload: agent,
  }
}

const fetchAgents = createHolochainZomeCallAsyncAction(
  PROFILES_INSTANCE_NAME,
  PROFILES_ZOME_NAME,
  'fetch_agents'
)

export { SET_AGENT, setAgent, fetchAgents }
