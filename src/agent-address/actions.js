/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROFILES_INSTANCE_NAME, PROFILES_ZOME_NAME, cell_id } from '../holochainConfig'

/* action creator functions */

const fetchAgentAddress = createZomeCallAsyncAction(
  cell_id,
  PROFILES_ZOME_NAME,
  'fetch_agent_address',
  cell_id[1]
)

export { fetchAgentAddress }
